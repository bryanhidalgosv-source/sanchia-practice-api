"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionService = void 0;
const client_1 = require("@prisma/client");
const http_error_1 = require("../common/http-error");
const prisma = new client_1.PrismaClient();
class ProductionService {
    async createPlan(data) {
        const product = await prisma.product.findUnique({ where: { id: data.productId } });
        if (!product)
            throw (0, http_error_1.notFound)('Producto no encontrado');
        if (data.quantity <= 0)
            throw (0, http_error_1.badRequest)('La cantidad debe ser mayor a 0');
        return prisma.productionPlan.create({
            data: {
                productId: data.productId,
                quantity: data.quantity,
                notes: data.notes,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
            },
        });
    }
    async findAllPlans(status) {
        return prisma.productionPlan.findMany({
            where: { deletedAt: null, ...(status ? { status } : {}) },
            include: { product: true, results: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findPlanById(id) {
        const plan = await prisma.productionPlan.findUnique({
            where: { id },
            include: { product: true, results: true },
        });
        if (!plan)
            throw (0, http_error_1.notFound)('Plan no encontrado');
        return plan;
    }
    async updatePlanStatus(id, status) {
        await this.findPlanById(id);
        return prisma.productionPlan.update({ where: { id }, data: { status } });
    }
    async registerResult(data) {
        const plan = await this.findPlanById(data.planId);
        if (plan.status !== 'IN_PROGRESS') {
            throw (0, http_error_1.badRequest)('El plan debe estar en progreso para registrar resultados');
        }
        if (data.quantity <= 0)
            throw (0, http_error_1.badRequest)('La cantidad debe ser mayor a 0');
        return prisma.productionResult.create({ data });
    }
    async createProduct(data) {
        return prisma.product.create({ data });
    }
    async findAllProducts() {
        return prisma.product.findMany({
            where: { deletedAt: null },
            include: { recipes: { include: { items: true } } },
        });
    }
}
exports.ProductionService = ProductionService;
//# sourceMappingURL=production.service.js.map