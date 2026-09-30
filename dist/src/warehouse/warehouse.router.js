"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const warehouse_controller_1 = require("./warehouse.controller");
const validation_mid_1 = require("../middlewares/validation.mid");
const warehouse_validator_1 = require("./warehouse.validator");
const auth_mid_1 = require("../middlewares/auth.mid");
const role_mid_1 = require("../middlewares/role.mid");
const router = (0, express_1.Router)();
const controller = new warehouse_controller_1.WarehouseController();
router.get('/', auth_mid_1.authenticate, controller.findAll.bind(controller));
router.get('/:id', auth_mid_1.authenticate, controller.findById.bind(controller));
router.post('/', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN', 'WAREHOUSE'), (0, validation_mid_1.validate)(warehouse_validator_1.createWarehouseSchema), controller.create.bind(controller));
router.post('/add-material', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN', 'WAREHOUSE'), (0, validation_mid_1.validate)(warehouse_validator_1.addMaterialSchema), controller.addMaterial.bind(controller));
router.post('/movements', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN', 'WAREHOUSE', 'OPERATOR'), (0, validation_mid_1.validate)(warehouse_validator_1.movementSchema), controller.createMovement.bind(controller));
router.get('/movements', auth_mid_1.authenticate, controller.getMovements.bind(controller));
exports.default = router;
//# sourceMappingURL=warehouse.router.js.map