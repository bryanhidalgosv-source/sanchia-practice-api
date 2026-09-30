"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    name: joi_1.default.string().min(2).max(100).required(),
    role: joi_1.default.string().valid('ADMIN', 'SUPERVISOR', 'OPERATOR', 'SELLER', 'WAREHOUSE', 'PRODUCTION').default('OPERATOR'),
});
exports.updateUserSchema = joi_1.default.object({
    email: joi_1.default.string().email(),
    name: joi_1.default.string().min(2).max(100),
    role: joi_1.default.string().valid('ADMIN', 'SUPERVISOR', 'OPERATOR', 'SELLER', 'WAREHOUSE', 'PRODUCTION'),
    active: joi_1.default.boolean(),
}).min(1);
//# sourceMappingURL=users.validator.js.map