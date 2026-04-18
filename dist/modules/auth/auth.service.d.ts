import { RegistrationPayload, LoginPayload } from "../../interfaces/auth.interfaces.js";
export declare const AuthService: {
    registerUser: (payload: RegistrationPayload) => Promise<{
        user: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            name: string;
            status: import("@prisma/client").$Enums.UserStatus;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    loginUser: (payload: LoginPayload) => Promise<{
        user: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            name: string;
            status: import("@prisma/client").$Enums.UserStatus;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken: (token: string) => Promise<{
        accessToken: string;
    }>;
};
