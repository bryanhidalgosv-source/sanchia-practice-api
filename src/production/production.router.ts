import { Router } from 'express';
import { ProductionController } from './production.controller';
import { validate } from '@middlewares/validation.mid';
import { createPlanSchema, updatePlanStatusSchema, registerResultSchema, createProductSchema } from './production.validator';
import { authenticate } from '@middlewares/auth.mid';
import { requireRole } from '@middlewares/role.mid';

const router = Router();
const controller = new ProductionController();

router.get('/products', authenticate, controller.findAllProducts.bind(controller));
router.post('/products', authenticate, requireRole('ADMIN'), validate(createProductSchema), controller.createProduct.bind(controller));

router.get('/plans', authenticate, controller.findAllPlans.bind(controller));
router.get('/plans/:id', authenticate, controller.findPlanById.bind(controller));
router.post('/plans', authenticate, requireRole('ADMIN', 'SUPERVISOR', 'PRODUCTION'), validate(createPlanSchema), controller.createPlan.bind(controller));
router.patch('/plans/:id/status', authenticate, requireRole('ADMIN', 'SUPERVISOR', 'PRODUCTION'), validate(updatePlanStatusSchema), controller.updatePlanStatus.bind(controller));

router.post('/results', authenticate, requireRole('ADMIN', 'SUPERVISOR', 'PRODUCTION', 'OPERATOR'), validate(registerResultSchema), controller.registerResult.bind(controller));

export default router;
