"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionController = void 0;
const production_service_1 = require("./production.service");
const service = new production_service_1.ProductionService();
class ProductionController {
    async createPlan(req, res) {
        const plan = await service.createPlan(req.body);
        return res.status(201).json({ success: true, data: plan });
    }
    async findAllPlans(req, res) {
        const { status } = req.query;
        const plans = await service.findAllPlans(status);
        return res.status(200).json({ success: true, data: plans });
    }
    async findPlanById(req, res) {
        const plan = await service.findPlanById(req.params.id);
        return res.status(200).json({ success: true, data: plan });
    }
    async updatePlanStatus(req, res) {
        const { status } = req.body;
        const plan = await service.updatePlanStatus(req.params.id, status);
        return res.status(200).json({ success: true, data: plan });
    }
    async registerResult(req, res) {
        const result = await service.registerResult(req.body);
        return res.status(201).json({ success: true, data: result });
    }
    async createProduct(req, res) {
        const product = await service.createProduct(req.body);
        return res.status(201).json({ success: true, data: product });
    }
    async findAllProducts(_req, res) {
        const products = await service.findAllProducts();
        return res.status(200).json({ success: true, data: products });
    }
}
exports.ProductionController = ProductionController;
//# sourceMappingURL=production.controller.js.map