export declare class AuthService {
    login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
        };
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
        createdAt: Date;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map