"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
const validation_mid_1 = require("../middlewares/validation.mid");
const users_validator_1 = require("./users.validator");
const auth_mid_1 = require("../middlewares/auth.mid");
const role_mid_1 = require("../middlewares/role.mid");
const router = (0, express_1.Router)();
const controller = new users_controller_1.UsersController();
router.get('/', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN', 'SUPERVISOR'), controller.findAll.bind(controller));
router.get('/:id', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN', 'SUPERVISOR'), controller.findById.bind(controller));
router.post('/', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN'), (0, validation_mid_1.validate)(users_validator_1.createUserSchema), controller.create.bind(controller));
router.patch('/:id', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN'), (0, validation_mid_1.validate)(users_validator_1.updateUserSchema), controller.update.bind(controller));
router.delete('/:id', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN'), controller.remove.bind(controller));
exports.default = router;
//# sourceMappingURL=users.router.js.map