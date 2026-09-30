"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipes_controller_1 = require("./recipes.controller");
const validation_mid_1 = require("../middlewares/validation.mid");
const recipes_validator_1 = require("./recipes.validator");
const auth_mid_1 = require("../middlewares/auth.mid");
const role_mid_1 = require("../middlewares/role.mid");
const router = (0, express_1.Router)();
const controller = new recipes_controller_1.RecipesController();
router.get('/', auth_mid_1.authenticate, controller.findAll.bind(controller));
router.get('/:id', auth_mid_1.authenticate, controller.findById.bind(controller));
router.post('/', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN', 'SUPERVISOR', 'PRODUCTION'), (0, validation_mid_1.validate)(recipes_validator_1.createRecipeSchema), controller.create.bind(controller));
router.delete('/:id', auth_mid_1.authenticate, (0, role_mid_1.requireRole)('ADMIN'), controller.remove.bind(controller));
exports.default = router;
//# sourceMappingURL=recipes.router.js.map