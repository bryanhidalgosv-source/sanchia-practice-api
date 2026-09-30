import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { badRequest } from '@common/http-error';

export const validate = (schema: Joi.ObjectSchema, source: 'body' | 'query' | 'params' = 'body') => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req[source], { abortEarly: false });

        if (error) {
            const details = error.details.map((d) => ({
                field: d.path.join('.'),
                message: d.message,
            }));
            throw badRequest('Error de validación', details);
        }

        req[source] = value;
        next();
    };
};
