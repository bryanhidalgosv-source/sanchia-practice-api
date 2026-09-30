import Joi from 'joi';

export const createMaterialSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    code: Joi.string().min(2).max(20).required(),
    description: Joi.string().max(500),
    unit: Joi.string().valid('KG', 'L', 'UNIDAD', 'M', 'G').default('UNIDAD'),
    minStock: Joi.number().integer().min(0).default(0),
});

export const updateMaterialSchema = Joi.object({
    name: Joi.string().min(2).max(100),
    description: Joi.string().max(500),
    unit: Joi.string().valid('KG', 'L', 'UNIDAD', 'M', 'G'),
    minStock: Joi.number().integer().min(0),
    active: Joi.boolean(),
}).min(1);
