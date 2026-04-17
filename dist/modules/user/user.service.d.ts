import { User, UserStatus } from "@prisma/client";
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
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        name: string;
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
    getMyProfileFromDB: (user: any) => Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        name: string;
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
    updateMyProfileInDB: (user: any, payload: Partial<User>) => Promise<{
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
