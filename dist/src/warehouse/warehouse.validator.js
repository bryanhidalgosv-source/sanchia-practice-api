"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movementSchema = exports.addMaterialSchema = exports.createWarehouseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createWarehouseSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).required(),
    code: joi_1.default.string().min(2).max(20).required(),
    location: joi_1.default.string().max(200),
});
exports.addMaterialSchema = joi_1.default.object({
    warehouseId: joi_1.default.string().uuid().required(),
    materialId: joi_1.default.string().uuid().required(),
    quantity: joi_1.default.number().positive().required(),
});
exports.movementSchema = joi_1.default.object({
    materialId: joi_1.default.string().uuid().required(),
    warehouseId: joi_1.default.string().uuid().required(),
    type: joi_1.default.string().valid('ENTRY', 'EXIT', 'TRANSFER', 'ADJUSTMENT').required(),
    quantity: joi_1.default.number().positive().required(),
    reason: joi_1.default.string().max(500),
});
//# sourceMappingURL=warehouse.validator.js.map