import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '@config/prisma';
import { env } from '@config/env';
import { unauthorized } from '@common/http-error';
import { JwtPayload } from '@middlewares/auth.mid';


export class AuthService {
    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.active) {
            throw unauthorized('Credenciales inválidas');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw unauthorized('Credenciales inválidas');
        }

        const payload: JwtPayload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '8h' });

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }

    async getProfile(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw unauthorized('Usuario no encontrado');
        }

        return user;
    }
}
