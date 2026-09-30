import { Request, Response } from 'express';
import { WarehouseService } from './warehouse.service';

const service = new WarehouseService();

export class WarehouseController {
    async findAll(_req: Request, res: Response) {
        const warehouses = await service.findAll();
        return res.status(200).json({ success: true, data: warehouses });
    }

    async findById(req: Request, res: Response) {
        const warehouse = await service.findById(req.params.id);
        return res.status(200).json({ success: true, data: warehouse });
    }

    async create(req: Request, res: Response) {
        const warehouse = await service.create(req.body);
        return res.status(201).json({ success: true, data: warehouse });
    }

    async addMaterial(req: Request, res: Response) {
        const { warehouseId, materialId, quantity } = req.body;
        const result = await service.addMaterial(warehouseId, materialId, quantity);
        return res.status(200).json({ success: true, data: result });
    }

    async createMovement(req: Request, res: Response) {
        const movement = await service.createMovement(req.body);
        return res.status(201).json({ success: true, data: movement });
    }

    async getMovements(req: Request, res: Response) {
        const { materialId } = req.query as { materialId?: string };
        const movements = await service.getMovements(materialId);
        return res.status(200).json({ success: true, data: movements });
    }
}
