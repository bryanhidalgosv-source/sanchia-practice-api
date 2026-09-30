"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecipeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createRecipeSchema = joi_1.default.object({
    productId: joi_1.default.string().uuid().required(),
    name: joi_1.default.string().min(2).max(100).required(),
    version: joi_1.default.string().default('1.0'),
    items: joi_1.default.array().items(joi_1.default.object({
        materialId: joi_1.default.string().uuid().required(),
        quantity: joi_1.default.number().positive().required(),
        unit: joi_1.default.string().valid('KG', 'L', 'UNIDAD', 'M', 'G').default('UNIDAD'),
    })).min(1).required(),
});
//# sourceMappingURL=recipes.validator.js.map