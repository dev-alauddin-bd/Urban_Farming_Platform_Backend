import { Prisma, Produce } from "@prisma/client";
import { TokenPayload } from "../../utils/generateTokens.js";
type IProduceFilterRequest = {
    searchTerm?: string;
    category?: string;
    certificationStatus?: string;
};
type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};
export declare const ProduceService: {
    createProduce: (data: Produce, user: TokenPayload) => Promise<Produce>;
    getAllProduces: (filters: IProduceFilterRequest, options: IPaginationOptions) => Promise<{
        meta: {
            total: number;
            page: number;
            limit: number;
        };
        data: ({
            vendor: {
                id: string;
                isDeleted: boolean;
                createdAt: Date;
                updatedAt: Date;
                farmName: string;
                farmLocation: string;
                certificationStatus: string;
                userId: string;
            };
        } & {
            name: string;
            id: string;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            certificationStatus: import("@prisma/client").$Enums.CertificationStatus;
            description: string;
            price: Prisma.Decimal;
            category: string;
            availableQuantity: number;
            vendorId: string;
        })[];
    }>;
    getSingleProduceFromDB: (id: string) => Promise<({
        vendor: {
            id: string;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            farmName: string;
            farmLocation: string;
            certificationStatus: string;
            userId: string;
        };
    } & {
        name: string;
        id: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        certificationStatus: import("@prisma/client").$Enums.CertificationStatus;
        description: string;
        price: Prisma.Decimal;
        category: string;
        availableQuantity: number;
        vendorId: string;
    }) | null>;
    updateProduceInDB: (id: string, payload: Partial<Produce>) => Promise<{
        name: string;
        id: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        certificationStatus: import("@prisma/client").$Enums.CertificationStatus;
        description: string;
        price: Prisma.Decimal;
        category: string;
        availableQuantity: number;
        vendorId: string;
    }>;
    deleteProduceFromDB: (id: string) => Promise<{
        name: string;
        id: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        certificationStatus: import("@prisma/client").$Enums.CertificationStatus;
        description: string;
        price: Prisma.Decimal;
        category: string;
        availableQuantity: number;
        vendorId: string;
    }>;
};
export {};
