import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
export declare const validate: (schema: Joi.ObjectSchema, source?: "body" | "query" | "params") => (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=validation.mid.d.ts.map