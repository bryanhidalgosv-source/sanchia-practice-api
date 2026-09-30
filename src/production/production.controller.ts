import { Request, Response } from 'express';
import { ProductionService } from './production.service';

const service = new ProductionService();

export class ProductionController {
    async createPlan(req: Request, res: Response) {
        const plan = await service.createPlan(req.body);
        return res.status(201).json({ success: true, data: plan });
    }

    async findAllPlans(req: Request, res: Response) {
        const { status } = req.query as { status?: string };
        const plans = await service.findAllPlans(status as any);
        return res.status(200).json({ success: true, data: plans });
    }

    async findPlanById(req: Request, res: Response) {
        const plan = await service.findPlanById(req.params.id);
        return res.status(200).json({ success: true, data: plan });
    }

    async updatePlanStatus(req: Request, res: Response) {
        const { status } = req.body;
        const plan = await service.updatePlanStatus(req.params.id, status);
        return res.status(200).json({ success: true, data: plan });
    }

    async registerResult(req: Request, res: Response) {
        const result = await service.registerResult(req.body);
        return res.status(201).json({ success: true, data: result });
    }

    async createProduct(req: Request, res: Response) {
        const product = await service.createProduct(req.body);
        return res.status(201).json({ success: true, data: product });
    }

    async findAllProducts(_req: Request, res: Response) {
        const products = await service.findAllProducts();
        return res.status(200).json({ success: true, data: products });
    }
}
