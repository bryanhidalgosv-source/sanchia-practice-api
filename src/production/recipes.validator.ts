import Joi from 'joi';

export const createRecipeSchema = Joi.object({
    productId: Joi.string().uuid().required(),
    name: Joi.string().min(2).max(100).required(),
    version: Joi.string().default('1.0'),
    items: Joi.array().items(
        Joi.object({
            materialId: Joi.string().uuid().required(),
            quantity: Joi.number().positive().required(),
            unit: Joi.string().valid('KG', 'L', 'UNIDAD', 'M', 'G').default('UNIDAD'),
        })
    ).min(1).required(),
});
