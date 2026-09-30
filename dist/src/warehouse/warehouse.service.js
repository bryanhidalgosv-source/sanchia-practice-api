"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseService = void 0;
const client_1 = require("@prisma/client");
const http_error_1 = require("../common/http-error");
const prisma = new client_1.PrismaClient();
class WarehouseService {
    async findAll() {
        return prisma.warehouse.findMany({
            where: { deletedAt: null },
            include: { materials: { include: { material: true } } },
        });
    }
    async findById(id) {
        const warehouse = await prisma.warehouse.findUnique({
            where: { id },
            include: { materials: { include: { material: true } } },
        });
        if (!warehouse)
            throw (0, http_error_1.notFound)('Almacén no encontrado');
        return warehouse;
    }
    async create(data) {
        return prisma.warehouse.create({ data });
    }
    async addMaterial(warehouseId, materialId, quantity) {
        await this.findById(warehouseId);
        const material = await prisma.material.findUnique({ where: { id: materialId } });
        if (!material)
            throw (0, http_error_1.notFound)('Material no encontrado');
        return prisma.warehouseMaterial.upsert({
            where: { warehouseId_materialId: { warehouseId, materialId } },
            update: { quantity: { increment: quantity } },
            create: { warehouseId, materialId, quantity },
        });
    }
    async createMovement(data) {
        if (data.quantity <= 0)
            throw (0, http_error_1.badRequest)('La cantidad debe ser mayor a 0');
        const material = await prisma.material.findUnique({ where: { id: data.materialId } });
        if (!material)
            throw (0, http_error_1.notFound)('Material no encontrado');
        const warehouse = await prisma.warehouse.findUnique({ where: { id: data.warehouseId } });
        if (!warehouse)
            throw (0, http_error_1.notFound)('Almacén no encontrado');
        if (data.type === 'EXIT') {
            const stock = await prisma.warehouseMaterial.findUnique({
                where: { warehouseId_materialId: { warehouseId: data.warehouseId, materialId: data.materialId } },
            });
            if (!stock || stock.quantity < data.quantity) {
                throw (0, http_error_1.badRequest)('Stock insuficiente para esta salida');
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
    async getMovements(materialId) {
        return prisma.stockMovement.findMany({
            where: materialId ? { materialId } : undefined,
            include: { material: true },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }
}
exports.WarehouseService = WarehouseService;
//# sourceMappingURL=warehouse.service.js.map