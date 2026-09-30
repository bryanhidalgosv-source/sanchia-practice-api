"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const service = new auth_service_1.AuthService();
class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        const result = await service.login(email, password);
        return res.status(200).json({ success: true, data: result });
    }
    async profile(req, res) {
        const user = await service.getProfile(req.user.id);
        return res.status(200).json({ success: true, data: user });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map