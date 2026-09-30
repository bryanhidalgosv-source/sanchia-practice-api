"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const http_error_1 = require("../common/http-error");
const requireRole = (...allowedRoles) => {
    return (req, _res, next) => {
        if (!req.user) {
            throw (0, http_error_1.forbidden)('Usuario no autenticado');
        }
        if (!allowedRoles.includes(req.user.role)) {
            throw (0, http_error_1.forbidden)(`Rol '${req.user.role}' no tiene permiso para esta acción`);
        }
        next();
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=role.mid.js.map