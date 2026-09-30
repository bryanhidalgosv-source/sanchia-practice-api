import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '@middlewares/validation.mid';
import { loginSchema } from './auth.validator';
import { authenticate } from '@middlewares/auth.mid';

const router = Router();
const controller = new AuthController();

router.post('/login', validate(loginSchema), controller.login.bind(controller));
router.get('/profile', authenticate, controller.profile.bind(controller));

export default router;
