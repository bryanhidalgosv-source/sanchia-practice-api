"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMaterialSchema = exports.createMaterialSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createMaterialSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).required(),
    code: joi_1.default.string().min(2).max(20).required(),
    description: joi_1.default.string().max(500),
    unit: joi_1.default.string().valid('KG', 'L', 'UNIDAD', 'M', 'G').default('UNIDAD'),
    minStock: joi_1.default.number().integer().min(0).default(0),
});
exports.updateMaterialSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100),
    description: joi_1.default.string().max(500),
    unit: joi_1.default.string().valid('KG', 'L', 'UNIDAD', 'M', 'G'),
    minStock: joi_1.default.number().integer().min(0),
    active: joi_1.default.boolean(),
}).min(1);
//# sourceMappingURL=materials.validator.js.map