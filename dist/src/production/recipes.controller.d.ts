import { Request, Response } from 'express';
export declare class RecipesController {
    findAll(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=recipes.controller.d.ts.map