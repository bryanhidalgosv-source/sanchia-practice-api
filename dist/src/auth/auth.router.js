"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validation_mid_1 = require("../middlewares/validation.mid");
const auth_validator_1 = require("./auth.validator");
const auth_mid_1 = require("../middlewares/auth.mid");
const router = (0, express_1.Router)();
const controller = new auth_controller_1.AuthController();
router.post('/login', (0, validation_mid_1.validate)(auth_validator_1.loginSchema), controller.login.bind(controller));
router.get('/profile', auth_mid_1.authenticate, controller.profile.bind(controller));
exports.default = router;
//# sourceMappingURL=auth.router.js.map