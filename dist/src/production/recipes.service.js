"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesService = void 0;
const client_1 = require("@prisma/client");
const http_error_1 = require("../common/http-error");
const prisma = new client_1.PrismaClient();
class RecipesService {
    async findAll() {
        return prisma.recipe.findMany({
            include: {
                product: true,
                items: { include: { material: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        const recipe = await prisma.recipe.findUnique({
            where: { id },
            include: {
                product: true,
                items: { include: { material: true } },
            },
        });
        if (!recipe)
            throw (0, http_error_1.notFound)('Receta no encontrada');
        return recipe;
    }
    async create(data) {
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
    async remove(id) {
        await this.findById(id);
        return prisma.recipe.delete({ where: { id } });
    }
}
exports.RecipesService = RecipesService;
//# sourceMappingURL=recipes.service.js.map