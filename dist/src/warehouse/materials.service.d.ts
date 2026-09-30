export declare class MaterialsService {
    findAll(): Promise<({
        warehouses: ({
            warehouse: {
                id: string;
                name: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                code: string;
                location: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            warehouseId: string;
            materialId: string;
            quantity: number;
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
        unit: string;
        minStock: number;
    })[]>;
    findById(id: string): Promise<{
        warehouses: ({
            warehouse: {
                id: string;
                name: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                code: string;
                location: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            warehouseId: string;
            materialId: string;
            quantity: number;
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
        unit: string;
        minStock: number;
    }>;
    create(data: {
        name: string;
        code: string;
        description?: string;
        unit?: string;
        minStock?: number;
    }): Promise<{
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
    }>;
    update(id: string, data: Partial<{
        name: string;
        description?: string;
        unit?: string;
        minStock?: number;
        active?: boolean;
    }>): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
//# sourceMappingURL=materials.service.d.ts.map