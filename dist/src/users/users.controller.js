"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_service_1 = require("./users.service");
const service = new users_service_1.UsersService();
class UsersController {
    async findAll(req, res) {
        const { page, limit } = req.query;
        const result = await service.findAll(page ? parseInt(page) : 1, limit ? parseInt(limit) : 10);
        return res.status(200).json({ success: true, data: result });
    }
    async findById(req, res) {
        const user = await service.findById(req.params.id);
        return res.status(200).json({ success: true, data: user });
    }
    async create(req, res) {
        const user = await service.create(req.body);
        return res.status(201).json({ success: true, data: user });
    }
    async update(req, res) {
        const user = await service.update(req.params.id, req.body);
        return res.status(200).json({ success: true, data: user });
    }
    async remove(req, res) {
        await service.remove(req.params.id);
        return res.status(200).json({ success: true, message: 'Usuario eliminado' });
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map