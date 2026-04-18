import { RentalSpace } from "@prisma/client";
import { TokenPayload } from "../../utils/generateTokens.js";
type IRentalSpaceFilterRequest = {
    searchTerm?: string;
    location?: string;
    availability?: boolean | string;
};
type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};
export declare const RentalSpaceService: {
    createRentalSpace: (data: Omit<RentalSpace, "id" | "vendorId" | "createdAt" | "updatedAt">, user: TokenPayload) => Promise<RentalSpace>;
    getAllRentalSpaces: (filters: IRentalSpaceFilterRequest, options: IPaginationOptions) => Promise<{
        meta: {
            total: number;
            page: number;
            limit: number;
        };
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            vendor: {
                id: string;
                farmName: string;
                farmLocation: string;
                certificationStatus: string;
            };
            location: string;
            size: string;
            availability: boolean;
        }[];
    }>;
    getSingleRentalSpace: (id: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        vendor: {
            id: string;
            farmName: string;
            farmLocation: string;
            certificationStatus: string;
            userId: string;
        };
        location: string;
        size: string;
        availability: boolean;
    } | null>;
    updateRentalSpaceInDB: (id: string, payload: Partial<RentalSpace>) => Promise<RentalSpace>;
    deleteRentalSpaceFromDB: (id: string) => Promise<RentalSpace>;
};
export {};
