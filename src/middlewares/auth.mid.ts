import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '@config/env';
import { unauthorized } from '@common/http-error';

export interface JwtPayload {
    id: string;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw unauthorized('Token no proporcionado');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
        req.user = payload;
        next();
    } catch {
        throw unauthorized('Token inválido o expirado');
    }
};
