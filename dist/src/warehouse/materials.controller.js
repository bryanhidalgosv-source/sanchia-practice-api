"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsController = void 0;
const materials_service_1 = require("./materials.service");
const service = new materials_service_1.MaterialsService();
class MaterialsController {
    async findAll(_req, res) {
        const materials = await service.findAll();
        return res.status(200).json({ success: true, data: materials });
    }
    async findById(req, res) {
        const material = await service.findById(req.params.id);
        return res.status(200).json({ success: true, data: material });
    }
    async create(req, res) {
        const material = await service.create(req.body);
        return res.status(201).json({ success: true, data: material });
    }
    async update(req, res) {
        const material = await service.update(req.params.id, req.body);
        return res.status(200).json({ success: true, data: material });
    }
    async remove(req, res) {
        await service.remove(req.params.id);
        return res.status(200).json({ success: true, message: 'Material eliminado' });
    }
}
exports.MaterialsController = MaterialsController;
//# sourceMappingURL=materials.controller.js.map