import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const service = new AuthService();

export class AuthController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const result = await service.login(email, password);
        return res.status(200).json({ success: true, data: result });
    }

    async profile(req: Request, res: Response) {
        const user = await service.getProfile(req.user!.id);
        return res.status(200).json({ success: true, data: user });
    }
}
