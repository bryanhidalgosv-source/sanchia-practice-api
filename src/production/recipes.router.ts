import { Router } from 'express';
import { RecipesController } from './recipes.controller';
import { validate } from '@middlewares/validation.mid';
import { createRecipeSchema } from './recipes.validator';
import { authenticate } from '@middlewares/auth.mid';
import { requireRole } from '@middlewares/role.mid';

const router = Router();
const controller = new RecipesController();

router.get('/', authenticate, controller.findAll.bind(controller));
router.get('/:id', authenticate, controller.findById.bind(controller));
router.post('/', authenticate, requireRole('ADMIN', 'SUPERVISOR', 'PRODUCTION'), validate(createRecipeSchema), controller.create.bind(controller));
router.delete('/:id', authenticate, requireRole('ADMIN'), controller.remove.bind(controller));

export default router;
