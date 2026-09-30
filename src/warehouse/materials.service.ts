import { prisma } from '@config/prisma';
import { notFound } from '@common/http-error';


export class MaterialsService {
    async findAll() {
        return prisma.material.findMany({
            where: { deletedAt: null },
            include: { warehouses: { include: { warehouse: true } } },
            orderBy: { name: 'asc' },
        });
    }

    async findLowStock() {
        const materials = await this.findAll();

        return materials
            .map((material) => ({
                ...material,
                totalStock: material.warehouses.reduce((sum, item) => sum + item.quantity, 0),
            }))
            .filter((material) => material.totalStock < material.minStock);
    }

    async findById(id: string) {
        const material = await prisma.material.findUnique({
            where: { id },
            include: { warehouses: { include: { warehouse: true } } },
        });
        if (!material) throw notFound('Material no encontrado');
        return material;
    }

    async create(data: { name: string; code: string; description?: string; unit?: string; minStock?: number }) {
        return prisma.material.create({ data });
    }

    async update(id: string, data: Partial<{ name: string; description?: string; unit?: string; minStock?: number; active?: boolean }>) {
        await this.findById(id);
        return prisma.material.update({ where: { id }, data });
    }

    async remove(id: string) {
        await this.findById(id);
        return prisma.material.update({
            where: { id },
            data: { deletedAt: new Date(), active: false },
        });
    }
}
