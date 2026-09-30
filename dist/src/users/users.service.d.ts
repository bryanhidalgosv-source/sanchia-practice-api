export declare class UsersService {
    findAll(page?: number, limit?: number): Promise<{
        users: {
            id: string;
            email: string;
            name: string;
            role: string;
            active: boolean;
            createdAt: Date;
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findById(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
        active: boolean;
        createdAt: Date;
    }>;
    create(data: {
        email: string;
        password: string;
        name: string;
        role?: string;
    }): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
        active: boolean;
        createdAt: Date;
    }>;
    update(id: string, data: Partial<{
        email: string;
        name: string;
        role: string;
        active: boolean;
    }>): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
        active: boolean;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
}
//# sourceMappingURL=users.service.d.ts.map