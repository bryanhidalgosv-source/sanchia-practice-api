export declare class ProductionService {
    createPlan(data: {
        productId: string;
        quantity: number;
        startDate?: Date | string;
        endDate?: Date | string;
        notes?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        quantity: number;
        status: string;
        startDate: Date | null;
        endDate: Date | null;
        notes: string | null;
        productId: string;
    }>;
    findAllPlans(status?: string): Promise<({
        product: {
            id: string;
            name: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            code: string;
            description: string | null;
            price: number;
        };
        results: {
            id: string;
            createdAt: Date;
            quantity: number;
            notes: string | null;
            defective: number;
            planId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        quantity: number;
        status: string;
        startDate: Date | null;
        endDate: Date | null;
        notes: string | null;
        productId: string;
    })[]>;
    findPlanById(id: string): Promise<{
        product: {
            id: string;
            name: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            code: string;
            description: string | null;
            price: number;
        };
        results: {
            id: string;
            createdAt: Date;
            quantity: number;
            notes: string | null;
            defective: number;
            planId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        quantity: number;
        status: string;
        startDate: Date | null;
        endDate: Date | null;
        notes: string | null;
        productId: string;
    }>;
    updatePlanStatus(id: string, status: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        quantity: number;
        status: string;
        startDate: Date | null;
        endDate: Date | null;
        notes: string | null;
        productId: string;
    }>;
    registerResult(data: {
        planId: string;
        quantity: number;
        defective?: number;
        notes?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        quantity: number;
        notes: string | null;
        defective: number;
        planId: string;
    }>;
    createProduct(data: {
        name: string;
        code: string;
        description?: string;
        price?: number;
    }): Promise<{
        id: string;
        name: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        code: string;
        description: string | null;
        price: number;
    }>;
    findAllProducts(): Promise<({
        recipes: ({
            items: {
                id: string;
                unit: string;
                materialId: string;
                quantity: number;
                recipeId: string;
            }[];
        } & {
            id: string;
            name: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            version: string;
        })[];
    } & {
        id: string;
        name: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        code: string;
        description: string | null;
        price: number;
    })[]>;
}
//# sourceMappingURL=production.service.d.ts.map