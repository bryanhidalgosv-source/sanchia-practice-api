"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseController = void 0;
const warehouse_service_1 = require("./warehouse.service");
const service = new warehouse_service_1.WarehouseService();
class WarehouseController {
    async findAll(_req, res) {
        const warehouses = await service.findAll();
        return res.status(200).json({ success: true, data: warehouses });
    }
    async findById(req, res) {
        const warehouse = await service.findById(req.params.id);
        return res.status(200).json({ success: true, data: warehouse });
    }
    async create(req, res) {
        const warehouse = await service.create(req.body);
        return res.status(201).json({ success: true, data: warehouse });
    }
    async addMaterial(req, res) {
        const { warehouseId, materialId, quantity } = req.body;
        const result = await service.addMaterial(warehouseId, materialId, quantity);
        return res.status(200).json({ success: true, data: result });
    }
    async createMovement(req, res) {
        const movement = await service.createMovement(req.body);
        return res.status(201).json({ success: true, data: movement });
    }
    async getMovements(req, res) {
        const { materialId } = req.query;
        const movements = await service.getMovements(materialId);
        return res.status(200).json({ success: true, data: movements });
    }
}
exports.WarehouseController = WarehouseController;
//# sourceMappingURL=warehouse.controller.js.map