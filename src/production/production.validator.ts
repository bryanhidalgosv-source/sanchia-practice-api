import Joi from 'joi';

export const createPlanSchema = Joi.object({
    productId: Joi.string().uuid().required(),
    quantity: Joi.number().integer().positive().required(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    notes: Joi.string().max(500),
});

export const updatePlanStatusSchema = Joi.object({
    status: Joi.string().valid('DRAFT', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'ON_HOLD').required(),
});

export const registerResultSchema = Joi.object({
    planId: Joi.string().uuid().required(),
    quantity: Joi.number().integer().positive().required(),
    defective: Joi.number().integer().min(0).default(0),
    notes: Joi.string().max(500),
});

export const createProductSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    code: Joi.string().min(2).max(20).required(),
    description: Joi.string().max(500),
    price: Joi.number().min(0).default(0),
});
