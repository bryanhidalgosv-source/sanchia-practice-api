"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const env_1 = require("../config/env");
const http_error_1 = require("../common/http-error");
const prisma = new client_1.PrismaClient();
class UsersService {
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where: { deletedAt: null },
                select: { id: true, email: true, name: true, role: true, active: true, createdAt: true },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.user.count({ where: { deletedAt: null } }),
        ]);
        return { users, total, page, totalPages: Math.ceil(total / limit) };
    }
    async findById(id) {
        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, email: true, name: true, role: true, active: true, createdAt: true },
        });
        if (!user)
            throw (0, http_error_1.notFound)('Usuario no encontrado');
        return user;
    }
    async create(data) {
        const existing = await prisma.user.findUnique({ where: { email: data.email } });
        if (existing)
            throw (0, http_error_1.conflict)('El email ya está registrado');
        const hashedPassword = await bcrypt_1.default.hash(data.password, env_1.env.SALT);
        return prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                role: data.role || 'OPERATOR',
            },
            select: { id: true, email: true, name: true, role: true, active: true, createdAt: true },
        });
    }
    async update(id, data) {
        await this.findById(id);
        return prisma.user.update({
            where: { id },
            data,
            select: { id: true, email: true, name: true, role: true, active: true, updatedAt: true },
        });
    }
    async remove(id) {
        await this.findById(id);
        return prisma.user.update({
            where: { id },
            data: { deletedAt: new Date(), active: false },
        });
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map