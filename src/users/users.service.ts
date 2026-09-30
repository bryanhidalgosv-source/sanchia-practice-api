import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { env } from '@config/env';
import { notFound, conflict } from '@common/http-error';

const prisma = new PrismaClient();

export class UsersService {
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

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, email: true, name: true, role: true, active: true, createdAt: true },
        });

        if (!user) throw notFound('Usuario no encontrado');
        return user;
    }

    async create(data: { email: string; password: string; name: string; role?: string }) {
        const existing = await prisma.user.findUnique({ where: { email: data.email } });
        if (existing) throw conflict('El email ya está registrado');

        const hashedPassword = await bcrypt.hash(data.password, env.SALT);

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

    async update(id: string, data: Partial<{ email: string; name: string; role: string; active: boolean }>) {
        await this.findById(id);
        return prisma.user.update({
            where: { id },
            data,
            select: { id: true, email: true, name: true, role: true, active: true, updatedAt: true },
        });
    }

    async remove(id: string) {
        await this.findById(id);
        return prisma.user.update({
            where: { id },
            data: { deletedAt: new Date(), active: false },
        });
    }
}
