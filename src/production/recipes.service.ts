import { prisma } from '@config/prisma';
import { notFound } from '@common/http-error';


export class RecipesService {
    async findAll() {
        return prisma.recipe.findMany({
            include: {
                product: true,
                items: { include: { material: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        const recipe = await prisma.recipe.findUnique({
            where: { id },
            include: {
                product: true,
                items: { include: { material: true } },
            },
        });
        if (!recipe) throw notFound('Receta no encontrada');
        return recipe;
    }

    async create(data: { productId: string; name: string; version?: string; items: { materialId: string; quantity: number; unit: string }[] }) {
        return prisma.recipe.create({
            data: {
                productId: data.productId,
                name: data.name,
                version: data.version || '1.0',
                items: {
                    create: data.items,
                },
            },
            include: {
                product: true,
                items: { include: { material: true } },
            },
        });
    }

    async remove(id: string) {
        await this.findById(id);
        return prisma.recipe.delete({ where: { id } });
    }
}
