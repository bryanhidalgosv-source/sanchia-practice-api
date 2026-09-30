import { Router } from 'express';
import { MaterialsController } from './materials.controller';
import { validate } from '@middlewares/validation.mid';
import { createMaterialSchema, updateMaterialSchema } from './materials.validator';
import { authenticate } from '@middlewares/auth.mid';
import { requireRole } from '@middlewares/role.mid';

const router = Router();
const controller = new MaterialsController();

router.get('/', authenticate, controller.findAll.bind(controller));
router.get('/:id', authenticate, controller.findById.bind(controller));
router.post('/', authenticate, requireRole('ADMIN', 'WAREHOUSE'), validate(createMaterialSchema), controller.create.bind(controller));
router.patch('/:id', authenticate, requireRole('ADMIN', 'WAREHOUSE'), validate(updateMaterialSchema), controller.update.bind(controller));
router.delete('/:id', authenticate, requireRole('ADMIN'), controller.remove.bind(controller));

export default router;
