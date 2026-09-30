import { PrismaClient } from '@prisma/client';
import { notFound, badRequest } from '@common/http-error';

const prisma = new PrismaClient();

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

        if (data.type === 'EXIT') {
            const stock = await prisma.warehouseMaterial.findUnique({
                where: { warehouseId_materialId: { warehouseId: data.warehouseId, materialId: data.materialId } },
            });
            if (!stock || stock.quantity < data.quantity) {
                throw badRequest('Stock insuficiente para esta salida');
            }
        }

        const [movement] = await prisma.$transaction([
            prisma.stockMovement.create({ data }),
            prisma.warehouseMaterial.upsert({
                where: { warehouseId_materialId: { warehouseId: data.warehouseId, materialId: data.materialId } },
                update: {
                    quantity: data.type === 'ENTRY'
                        ? { increment: data.quantity }
                        : { decrement: data.quantity },
                },
                create: {
                    warehouseId: data.warehouseId,
                    materialId: data.materialId,
                    quantity: data.type === 'ENTRY' ? data.quantity : -data.quantity,
                },
            }),
        ]);

        return movement;
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
