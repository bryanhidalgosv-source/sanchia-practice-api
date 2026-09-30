"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_error_1 = require("../common/http-error");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof http_error_1.HttpError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            details: err.details,
        });
    }
    console.error('Error no manejado:', err);
    return res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.mid.js.map