import { Request, Response } from 'express';
import { MaterialsService } from './materials.service';

const service = new MaterialsService();

export class MaterialsController {
    async findAll(_req: Request, res: Response) {
        const materials = await service.findAll();
        return res.status(200).json({ success: true, data: materials });
    }
    async findLowStock(_req: Request, res: Response) {
        const materials = await service.findLowStock();
        return res.status(200).json({ success: true, data: materials });
    }

    async findById(req: Request, res: Response) {
        const material = await service.findById(req.params.id);
        return res.status(200).json({ success: true, data: material });
    }

    async create(req: Request, res: Response) {
        const material = await service.create(req.body);
        return res.status(201).json({ success: true, data: material });
    }

    async update(req: Request, res: Response) {
        const material = await service.update(req.params.id, req.body);
        return res.status(200).json({ success: true, data: material });
    }

    async remove(req: Request, res: Response) {
        await service.remove(req.params.id);
        return res.status(200).json({ success: true, message: 'Material eliminado' });
    }
}
