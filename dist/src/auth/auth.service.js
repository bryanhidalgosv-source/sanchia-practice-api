"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const env_1 = require("../config/env");
const http_error_1 = require("../common/http-error");
const prisma = new client_1.PrismaClient();
class AuthService {
    async login(email, password) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.active) {
            throw (0, http_error_1.unauthorized)('Credenciales inválidas');
        }
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            throw (0, http_error_1.unauthorized)('Credenciales inválidas');
        }
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const token = jsonwebtoken_1.default.sign(payload, env_1.env.JWT_SECRET, { expiresIn: '8h' });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }
    async getProfile(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });
        if (!user) {
            throw (0, http_error_1.unauthorized)('Usuario no encontrado');
        }
        return user;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map