export declare class RecipesService {
    findAll(): Promise<({
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
        items: ({
            material: {
                id: string;
                name: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                code: string;
                description: string | null;
                unit: string;
                minStock: number;
            };
        } & {
            id: string;
            unit: string;
            materialId: string;
            quantity: number;
            recipeId: string;
        })[];
    } & {
        id: string;
        name: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        version: string;
    })[]>;
    findById(id: string): Promise<{
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
        items: ({
            material: {
                id: string;
                name: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                code: string;
                description: string | null;
                unit: string;
                minStock: number;
            };
        } & {
            id: string;
            unit: string;
            materialId: string;
            quantity: number;
            recipeId: string;
        })[];
    } & {
        id: string;
        name: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        version: string;
    }>;
    create(data: {
        productId: string;
        name: string;
        version?: string;
        items: {
            materialId: string;
            quantity: number;
            unit: string;
        }[];
    }): Promise<{
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
        items: ({
            material: {
                id: string;
                name: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                code: string;
                description: string | null;
                unit: string;
                minStock: number;
            };
        } & {
            id: string;
            unit: string;
            materialId: string;
            quantity: number;
            recipeId: string;
        })[];
    } & {
        id: string;
        name: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        version: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        version: string;
    }>;
}
//# sourceMappingURL=recipes.service.d.ts.map