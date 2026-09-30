import { prisma } from '@config/prisma';
import { notFound, badRequest } from '@common/http-error';


export class WarehouseService {
    async findAll() {
        return prisma.warehouse.findMany({
            where: { deletedAt: null },
            include: { materials: { include: { material: true } } },
        });
    }

    async findById(id: string) {
        const warehouse = await prisma.warehouse.findUnique({
            where: { id },
            include: { materials: { include: { material: true } } },
        });
        if (!warehouse) throw notFound('Almacén no encontrado');
        return warehouse;
    }

    async create(data: { name: string; code: string; location?: string }) {
        return prisma.warehouse.create({ data });
    }

    async addMaterial(warehouseId: string, materialId: string, quantity: number) {
        await this.findById(warehouseId);

        const material = await prisma.material.findUnique({ where: { id: materialId } });
        if (!material) throw notFound('Material no encontrado');

        return prisma.warehouseMaterial.upsert({
            where: { warehouseId_materialId: { warehouseId, materialId } },
            update: { quantity: { increment: quantity } },
            create: { warehouseId, materialId, quantity },
        });
    }

    async createMovement(data: { materialId: string; warehouseId: string; type: string; quantity: number; reason?: string }) {
        if (data.quantity <= 0) throw badRequest('La cantidad debe ser mayor a 0');

        const material = await prisma.material.findUnique({ where: { id: data.materialId } });
        if (!material) throw notFound('Material no encontrado');

        const warehouse = await prisma.warehouse.findUnique({ where: { id: data.warehouseId } });
        if (!warehouse) throw notFound('Almacén no encontrado');

        const { warehouseId, materialId, quantity } = data;

        return prisma.$transaction(async (tx) => {
            if (data.type === 'ENTRY') {
                await tx.warehouseMaterial.upsert({
                    where: { warehouseId_materialId: { warehouseId, materialId } },
                    update: { quantity: { increment: quantity } },
                    create: { warehouseId, materialId, quantity },
                });
            } else {
                // Un solo UPDATE condicionado: revisa y descuenta a la vez, así dos salidas
                // simultáneas no pueden dejar el stock en negativo.
                const { count } = await tx.warehouseMaterial.updateMany({
                    where: { warehouseId, materialId, quantity: { gte: quantity } },
                    data: { quantity: { decrement: quantity } },
                });
                if (count === 0) throw badRequest('Stock insuficiente para esta salida');
            }

            return tx.stockMovement.create({ data });
        });
    }

    async getMovements(materialId?: string) {
        return prisma.stockMovement.findMany({
            where: materialId ? { materialId } : undefined,
            include: { material: true },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }
}
