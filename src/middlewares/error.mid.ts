import { Request, Response, NextFunction } from 'express';
import { HttpError } from '@common/http-error';

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            details: err.details,
        });
    }

    console.error('Error no manejado:', err);
    return res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
    });
};
