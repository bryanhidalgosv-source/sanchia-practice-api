"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conflict = exports.notFound = exports.forbidden = exports.unauthorized = exports.badRequest = exports.HttpError = void 0;
class HttpError extends Error {
    constructor(statusCode, message, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
exports.HttpError = HttpError;
const badRequest = (msg, details) => new HttpError(400, msg, details);
exports.badRequest = badRequest;
const unauthorized = (msg = 'No autorizado') => new HttpError(401, msg);
exports.unauthorized = unauthorized;
const forbidden = (msg = 'Acceso denegado') => new HttpError(403, msg);
exports.forbidden = forbidden;
const notFound = (msg = 'Recurso no encontrado') => new HttpError(404, msg);
exports.notFound = notFound;
const conflict = (msg) => new HttpError(409, msg);
exports.conflict = conflict;
//# sourceMappingURL=http-error.js.map