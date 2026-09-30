import { Request, Response } from 'express';
export declare class ProductionController {
    createPlan(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findAllPlans(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findPlanById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updatePlanStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    registerResult(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findAllProducts(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=production.controller.d.ts.map