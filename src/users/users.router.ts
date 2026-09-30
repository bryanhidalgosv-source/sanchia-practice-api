import { Router } from 'express';
import { UsersController } from './users.controller';
import { validate } from '@middlewares/validation.mid';
import { createUserSchema, updateUserSchema } from './users.validator';
import { authenticate } from '@middlewares/auth.mid';
import { requireRole } from '@middlewares/role.mid';

const router = Router();
const controller = new UsersController();

router.get('/', authenticate, requireRole('ADMIN', 'SUPERVISOR'), controller.findAll.bind(controller));
router.get('/:id', authenticate, requireRole('ADMIN', 'SUPERVISOR'), controller.findById.bind(controller));
router.post('/', authenticate, requireRole('ADMIN'), validate(createUserSchema), controller.create.bind(controller));
router.patch('/:id', authenticate, requireRole('ADMIN'), validate(updateUserSchema), controller.update.bind(controller));
router.delete('/:id', authenticate, requireRole('ADMIN'), controller.remove.bind(controller));

export default router;
