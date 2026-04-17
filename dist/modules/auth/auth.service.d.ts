import { LoginPayload } from "../../interfaces/auth.interfaces.js";
import { RegistrationPayload } from "../../interfaces/auth.interfaces.js";
export declare const AuthService: {
    registerUser: (payload: RegistrationPayload) => Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    loginUser: (payload: LoginPayload) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            name: string;
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            status: import("@prisma/client").$Enums.UserStatus;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    refreshToken: (token: string) => Promise<{
        accessToken: string;
    }>;
};
