import Joi from 'joi';

export const createWarehouseSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    code: Joi.string().min(2).max(20).required(),
    location: Joi.string().max(200),
});

export const addMaterialSchema = Joi.object({
    warehouseId: Joi.string().uuid().required(),
    materialId: Joi.string().uuid().required(),
    quantity: Joi.number().positive().required(),
});

export const movementSchema = Joi.object({
    materialId: Joi.string().uuid().required(),
    warehouseId: Joi.string().uuid().required(),
    type: Joi.string().valid('ENTRY', 'EXIT', 'TRANSFER', 'ADJUSTMENT').required(),
    quantity: Joi.number().positive().required(),
    reason: Joi.string().max(500),
});
