import { Prisma, Produce, CertificationStatus } from "@prisma/client";
import { TokenPayload } from "../../utils/generateTokens.js";
type IProduceFilterRequest = {
    searchTerm?: string;
    category?: string;
    certificationStatus?: CertificationStatus;
};
type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};
export declare const ProduceService: {
    createProduce: (data: Omit<Produce, "id" | "vendorId" | "createdAt" | "updatedAt">, user: TokenPayload) => Promise<Produce>;
    getAllProduces: (filters: IProduceFilterRequest, options: IPaginationOptions) => Promise<{
        meta: {
            total: number;
            page: number;
            limit: number;
        };
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            certificationStatus: import("@prisma/client").$Enums.CertificationStatus;
            description: string;
            price: Prisma.Decimal;
            category: string;
            availableQuantity: number;
            vendor: {
                id: string;
                farmName: string;
                farmLocation: string;
                certificationStatus: string;
            };
        }[];
    }>;
    getSingleProduceFromDB: (id: string) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        certificationStatus: import("@prisma/client").$Enums.CertificationStatus;
        description: string;
        price: Prisma.Decimal;
        category: string;
        availableQuantity: number;
        vendor: {
            id: string;
            farmName: string;
            farmLocation: string;
            certificationStatus: string;
            userId: string;
        };
    } | null>;
    updateProduceInDB: (id: string, payload: Partial<Produce>) => Promise<Produce>;
    deleteProduceFromDB: (id: string) => Promise<Produce>;
};
export {};
