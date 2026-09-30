"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materials_controller_1 = require("./materials.controller");
const validation_mid_1 = require("../middlewares/validation.mid");
const materials_validator_1 = require("./materials.validator");
const auth_mid_1 = require("../middlewares/auth.mid");
const role_mid_1 = require("../middlewares/role.mid");
const router = (0, express_1.Router)();
const controller = new materials_controller_1.MaterialsController();
router.get('/', auth_mid_1.authenticate, controller.findAll.bind(controller));
router.get('/:id', auth_mid_1.authenticate, controller.findById.bind(controller));
router.post('/', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN', 'WAREHOUSE'), (0, validation_mid_1.validate)(materials_validator_1.createMaterialSchema), controller.create.bind(controller));
router.patch('/:id', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN', 'WAREHOUSE'), (0, validation_mid_1.validate)(materials_validator_1.updateMaterialSchema), controller.update.bind(controller));
router.delete('/:id', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN'), controller.remove.bind(controller));
exports.default = router;
//# sourceMappingURL=materials.router.js.map