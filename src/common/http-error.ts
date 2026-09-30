export class HttpError extends Error {
    statusCode: number;
    details?: unknown;

    constructor(statusCode: number, message: string, details?: unknown) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}

export const badRequest = (msg: string, details?: unknown) => new HttpError(400, msg, details);
export const unauthorized = (msg = 'No autorizado') => new HttpError(401, msg);
export const forbidden = (msg = 'Acceso denegado') => new HttpError(403, msg);
export const notFound = (msg = 'Recurso no encontrado') => new HttpError(404, msg);
export const conflict = (msg: string) => new HttpError(409, msg);
