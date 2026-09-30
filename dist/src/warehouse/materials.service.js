"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsService = void 0;
const client_1 = require("@prisma/client");
const http_error_1 = require("../common/http-error");
const prisma = new client_1.PrismaClient();
class MaterialsService {
    async findAll() {
        return prisma.material.findMany({
            where: { deletedAt: null },
            include: { warehouses: { include: { warehouse: true } } },
            orderBy: { name: 'asc' },
        });
    }
    async findById(id) {
        const material = await prisma.material.findUnique({
            where: { id },
            include: { warehouses: { include: { warehouse: true } } },
        });
        if (!material)
            throw (0, http_error_1.notFound)('Material no encontrado');
        return material;
    }
    async create(data) {
        return prisma.material.create({ data });
    }
    async update(id, data) {
        await this.findById(id);
        return prisma.material.update({ where: { id }, data });
    }
    async remove(id) {
        await this.findById(id);
        return prisma.material.update({
            where: { id },
            data: { deletedAt: new Date(), active: false },
        });
    }
}
exports.MaterialsService = MaterialsService;
//# sourceMappingURL=materials.service.js.map