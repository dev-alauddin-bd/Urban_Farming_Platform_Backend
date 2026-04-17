import { RentalSpace } from "@prisma/client";
export declare const RentalSpaceService: {
    createRentalSpace: (data: any, user: any) => Promise<RentalSpace>;
    getAllRentalSpaces: (filters: any, options: any) => Promise<{
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
            id: string;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            vendorId: string;
            location: string;
            size: string;
            availability: boolean;
        })[];
    }>;
    getSingleRentalSpace: (id: string) => Promise<RentalSpace | null>;
    updateRentalSpaceInDB: (id: string, payload: Partial<RentalSpace>) => Promise<RentalSpace>;
    deleteRentalSpaceFromDB: (id: string) => Promise<RentalSpace>;
};
