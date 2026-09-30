import { Request, Response } from 'express';
import { UsersService } from './users.service';

const service = new UsersService();

export class UsersController {
    async findAll(req: Request, res: Response) {
        const { page, limit } = req.query as { page?: string; limit?: string };
        const result = await service.findAll(
            page ? parseInt(page) : 1,
            limit ? parseInt(limit) : 10
        );
        return res.status(200).json({ success: true, data: result });
    }

    async findById(req: Request, res: Response) {
        const user = await service.findById(req.params.id);
        return res.status(200).json({ success: true, data: user });
    }

    async create(req: Request, res: Response) {
        const user = await service.create(req.body);
        return res.status(201).json({ success: true, data: user });
    }

    async update(req: Request, res: Response) {
        const user = await service.update(req.params.id, req.body);
        return res.status(200).json({ success: true, data: user });
    }

    async remove(req: Request, res: Response) {
        await service.remove(req.params.id);
        return res.status(200).json({ success: true, message: 'Usuario eliminado' });
    }
}
