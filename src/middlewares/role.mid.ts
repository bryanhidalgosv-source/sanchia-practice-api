import { Request, Response, NextFunction } from 'express';
import { forbidden } from '@common/http-error';

export const requireRole = (...allowedRoles: string[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (!req.user) {
            throw forbidden('Usuario no autenticado');
        }

        if (!allowedRoles.includes(req.user.role)) {
            throw forbidden(`Rol '${req.user.role}' no tiene permiso para esta acción`);
        }

        next();
    };
};
