import { User, UserStatus } from "@prisma/client";
import { TokenPayload } from "../../utils/generateTokens.js";
export declare const UserService: {
    getAllUsersFromDB: () => Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
        vendorProfile: {
            id: string;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            farmName: string;
            farmLocation: string;
            certificationStatus: string;
            userId: string;
        } | null;
    }[]>;
    getSingleUserFromDB: (id: string) => Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
        vendorProfile: {
            id: string;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            farmName: string;
            farmLocation: string;
            certificationStatus: string;
            userId: string;
        } | null;
    }>;
    getMyProfileFromDB: (user: TokenPayload) => Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
        vendorProfile: {
            id: string;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            farmName: string;
            farmLocation: string;
            certificationStatus: string;
            userId: string;
        } | null;
    }>;
    updateMyProfileInDB: (user: TokenPayload, payload: Partial<User>) => Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUserFromDB: (id: string) => Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    changeUserStatusInDB: (id: string, status: UserStatus) => Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
