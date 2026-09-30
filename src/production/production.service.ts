import { prisma } from '@config/prisma';
import { notFound, badRequest } from '@common/http-error';


// Estado actual -> estados a los que se puede pasar. COMPLETED y CANCELLED son finales.
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
    DRAFT: ['IN_PROGRESS', 'CANCELLED'],
    IN_PROGRESS: ['COMPLETED', 'ON_HOLD', 'CANCELLED'],
    ON_HOLD: ['IN_PROGRESS', 'CANCELLED'],
    COMPLETED: [],
    CANCELLED: [],
};

export class ProductionService {
    async createPlan(data: { productId: string; quantity: number; startDate?: Date | string; endDate?: Date | string; notes?: string }) {
        const product = await prisma.product.findUnique({ where: { id: data.productId } });
        if (!product) throw notFound('Producto no encontrado');

        if (data.quantity <= 0) throw badRequest('La cantidad debe ser mayor a 0');

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

    async findAllPlans(status?: string) {
        return prisma.productionPlan.findMany({
            where: { deletedAt: null, ...(status ? { status } : {}) },
            include: { product: true, results: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findPlanById(id: string) {
        const plan = await prisma.productionPlan.findUnique({
            where: { id },
            include: { product: true, results: true },
        });
        if (!plan) throw notFound('Plan no encontrado');
        return plan;
    }

    async updatePlanStatus(id: string, status: string) {
        const plan = await this.findPlanById(id);

        if (!(ALLOWED_TRANSITIONS[plan.status] ?? []).includes(status)) {
            throw badRequest(`No se puede pasar un plan de ${plan.status} a ${status}`);
        }

        return prisma.productionPlan.update({ where: { id }, data: { status } });
    }

    async registerResult(data: { planId: string; quantity: number; defective?: number; notes?: string }) {
        const plan = await this.findPlanById(data.planId);

        if (plan.status !== 'IN_PROGRESS') {
            throw badRequest('El plan debe estar en progreso para registrar resultados');
        }

        if (data.quantity <= 0) throw badRequest('La cantidad debe ser mayor a 0');

        return prisma.productionResult.create({ data });
    }

    async createProduct(data: { name: string; code: string; description?: string; price?: number }) {
        return prisma.product.create({ data });
    }

    async findAllProducts() {
        return prisma.product.findMany({
            where: { deletedAt: null },
            include: { recipes: { include: { items: true } } },
        });
    }
}
