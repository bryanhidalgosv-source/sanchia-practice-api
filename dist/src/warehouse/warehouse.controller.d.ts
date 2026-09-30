import { Request, Response } from 'express';
export declare class WarehouseController {
    findAll(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    addMaterial(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createMovement(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getMovements(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=warehouse.controller.d.ts.map