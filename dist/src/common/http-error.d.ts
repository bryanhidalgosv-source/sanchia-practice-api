export declare class HttpError extends Error {
    statusCode: number;
    details?: unknown;
    constructor(statusCode: number, message: string, details?: unknown);
}
export declare const badRequest: (msg: string, details?: unknown) => HttpError;
export declare const unauthorized: (msg?: string) => HttpError;
export declare const forbidden: (msg?: string) => HttpError;
export declare const notFound: (msg?: string) => HttpError;
export declare const conflict: (msg: string) => HttpError;
//# sourceMappingURL=http-error.d.ts.map