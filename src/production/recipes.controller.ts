import { Request, Response } from 'express';
import { RecipesService } from './recipes.service';

const service = new RecipesService();

export class RecipesController {
    async findAll(_req: Request, res: Response) {
        const recipes = await service.findAll();
        return res.status(200).json({ success: true, data: recipes });
    }

    async findById(req: Request, res: Response) {
        const recipe = await service.findById(req.params.id);
        return res.status(200).json({ success: true, data: recipe });
    }

    async create(req: Request, res: Response) {
        const recipe = await service.create(req.body);
        return res.status(201).json({ success: true, data: recipe });
    }

    async remove(req: Request, res: Response) {
        await service.remove(req.params.id);
        return res.status(200).json({ success: true, message: 'Receta eliminada' });
    }
}
