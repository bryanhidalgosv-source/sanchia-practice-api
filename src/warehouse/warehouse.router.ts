import { Router } from 'express';
import { WarehouseController } from './warehouse.controller';
import { validate } from '@middlewares/validation.mid';
import { createWarehouseSchema, addMaterialSchema, movementSchema } from './warehouse.validator';
import { authenticate } from '@middlewares/auth.mid';
import { requireRole } from '@middlewares/role.mid';

const router = Router();
const controller = new WarehouseController();

router.get('/', authenticate, controller.findAll.bind(controller));
router.get('/movements', authenticate, controller.getMovements.bind(controller));
router.get('/:id', authenticate, controller.findById.bind(controller));
router.post('/', authenticate, requireRole('ADMIN', 'WAREHOUSE'), validate(createWarehouseSchema), controller.create.bind(controller));
router.post('/add-material', authenticate, requireRole('ADMIN', 'WAREHOUSE'), validate(addMaterialSchema), controller.addMaterial.bind(controller));
router.post('/movements', authenticate, requireRole('ADMIN', 'WAREHOUSE', 'OPERATOR'), validate(movementSchema), controller.createMovement.bind(controller));

export default router;
