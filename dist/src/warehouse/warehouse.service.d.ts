export declare class WarehouseService {
    findAll(): Promise<({
        materials: ({
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
        location: string | null;
    })[]>;
    findById(id: string): Promise<{
        materials: ({
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
        location: string | null;
    }>;
    create(data: {
        name: string;
        code: string;
        location?: string;
    }): Promise<{
        id: string;
        name: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        code: string;
        location: string | null;
    }>;
    addMaterial(warehouseId: string, materialId: string, quantity: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        warehouseId: string;
        materialId: string;
        quantity: number;
    }>;
    createMovement(data: {
        materialId: string;
        warehouseId: string;
        type: string;
        quantity: number;
        reason?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        warehouseId: string;
        materialId: string;
        quantity: number;
        type: string;
        reason: string | null;
    }>;
    getMovements(materialId?: string): Promise<({
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
        createdAt: Date;
        warehouseId: string;
        materialId: string;
        quantity: number;
        type: string;
        reason: string | null;
    })[]>;
}
//# sourceMappingURL=warehouse.service.d.ts.map