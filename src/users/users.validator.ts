import Joi from 'joi';

export const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(100).required(),
    role: Joi.string().valid('ADMIN', 'SUPERVISOR', 'OPERATOR', 'SELLER', 'WAREHOUSE', 'PRODUCTION').default('OPERATOR'),
});

export const updateUserSchema = Joi.object({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(100),
    role: Joi.string().valid('ADMIN', 'SUPERVISOR', 'OPERATOR', 'SELLER', 'WAREHOUSE', 'PRODUCTION'),
    active: Joi.boolean(),
}).min(1);
