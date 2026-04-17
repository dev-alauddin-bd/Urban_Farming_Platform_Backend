import { User } from "@prisma/client";
import { LoginPayload } from "../../interfaces/auth.interfaces.js";
export declare const AuthService: {
    registerUser: (payload: User) => Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        name: string;
        status: import("@prisma/client").$Enums.UserStatus;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    loginUser: (payload: LoginPayload) => Promise<{
        accessToken: string;
        refreshToken: string;
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
    }>;
    refreshToken: (token: string) => Promise<{
        accessToken: string;
    }>;
};
