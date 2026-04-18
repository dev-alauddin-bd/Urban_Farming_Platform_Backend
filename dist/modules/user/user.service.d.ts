import { User, UserStatus } from "@prisma/client";
import { TokenPayload } from "../../utils/generateTokens.js";
export declare const UserService: {
    getAllUsersFromDB: () => Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        name: string;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
        vendorProfile: {
            id: string;
            farmName: string;
            farmLocation: string;
            certificationStatus: string;
        } | null;
    }[]>;
    getSingleUserFromDB: (id: string) => Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        name: string;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
        vendorProfile: {
            id: string;
            farmName: string;
            farmLocation: string;
            certificationStatus: string;
        } | null;
    }>;
    getMyProfileFromDB: (user: TokenPayload) => Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        name: string;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
        vendorProfile: {
            id: string;
            farmName: string;
            farmLocation: string;
            certificationStatus: string;
        } | null;
    }>;
    updateMyProfileInDB: (user: TokenPayload, payload: Partial<User>) => Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        name: string;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUserFromDB: (id: string) => Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        name: string;
        password: string;
        status: import("@prisma/client").$Enums.UserStatus;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    changeUserStatusInDB: (id: string, status: UserStatus) => Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        name: string;
        password: string;
        status: import("@prisma/client").$Enums.UserStatus;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
