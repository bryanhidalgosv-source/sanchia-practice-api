"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const production_controller_1 = require("./production.controller");
const validation_mid_1 = require("../middlewares/validation.mid");
const production_validator_1 = require("./production.validator");
const auth_mid_1 = require("../middlewares/auth.mid");
const role_mid_1 = require("../middlewares/role.mid");
const router = (0, express_1.Router)();
const controller = new production_controller_1.ProductionController();
router.get('/products', auth_mid_1.authenticate, controller.findAllProducts.bind(controller));
router.post('/products', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN'), (0, validation_mid_1.validate)(production_validator_1.createProductSchema), controller.createProduct.bind(controller));
router.get('/plans', auth_mid_1.authenticate, controller.findAllPlans.bind(controller));
router.get('/plans/:id', auth_mid_1.authenticate, controller.findPlanById.bind(controller));
router.post('/plans', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN', 'SUPERVISOR', 'PRODUCTION'), (0, validation_mid_1.validate)(production_validator_1.createPlanSchema), controller.createPlan.bind(controller));
router.patch('/plans/:id/status', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN', 'SUPERVISOR', 'PRODUCTION'), (0, validation_mid_1.validate)(production_validator_1.updatePlanStatusSchema), controller.updatePlanStatus.bind(controller));
router.post('/results', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN', 'SUPERVISOR', 'PRODUCTION', 'OPERATOR'), (0, validation_mid_1.validate)(production_validator_1.registerResultSchema), controller.registerResult.bind(controller));
exports.default = router;
//# sourceMappingURL=production.router.js.map