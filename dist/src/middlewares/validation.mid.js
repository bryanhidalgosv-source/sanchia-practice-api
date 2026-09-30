"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const http_error_1 = require("../common/http-error");
const validate = (schema, source = 'body') => {
    return (req, _res, next) => {
        const { error, value } = schema.validate(req[source], { abortEarly: false });
        if (error) {
            const details = error.details.map((d) => ({
                field: d.path.join('.'),
                message: d.message,
            }));
            throw (0, http_error_1.badRequest)('Error de validación', details);
        }
        req[source] = value;
        next();
    };
};
exports.validate = validate;
//# sourceMappingURL=validation.mid.js.map