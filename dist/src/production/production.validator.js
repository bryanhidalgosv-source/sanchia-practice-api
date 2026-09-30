"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = exports.registerResultSchema = exports.updatePlanStatusSchema = exports.createPlanSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPlanSchema = joi_1.default.object({
    productId: joi_1.default.string().uuid().required(),
    quantity: joi_1.default.number().integer().positive().required(),
    startDate: joi_1.default.date(),
    endDate: joi_1.default.date(),
    notes: joi_1.default.string().max(500),
});
exports.updatePlanStatusSchema = joi_1.default.object({
    status: joi_1.default.string().valid('DRAFT', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'ON_HOLD').required(),
});
exports.registerResultSchema = joi_1.default.object({
    planId: joi_1.default.string().uuid().required(),
    quantity: joi_1.default.number().integer().positive().required(),
    defective: joi_1.default.number().integer().min(0).default(0),
    notes: joi_1.default.string().max(500),
});
exports.createProductSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).required(),
    code: joi_1.default.string().min(2).max(20).required(),
    description: joi_1.default.string().max(500),
    price: joi_1.default.number().min(0).default(0),
});
//# sourceMappingURL=production.validator.js.map