import { Prisma, RentalSpace } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { paginationHelpers } from "../../utils/pagination.js";
import { TokenPayload } from "../../utils/generateTokens.js";

// ============================= TYPES =============================
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

// ============================= CREATE =============================
const createRentalSpace = async (
    data: Omit<RentalSpace, "id" | "vendorId" | "createdAt" | "updatedAt">,
    user: TokenPayload
): Promise<RentalSpace> => {
    const vendor = await prisma.vendorProfile.findUnique({
        where: { userId: user.id },
    });

    if (!vendor) {
        throw new Error("Vendor profile not found!");
    }

    return prisma.rentalSpace.create({
        data: {
            ...data,
            vendorId: vendor.id,
        },
    });
};

// ============================= GET ALL =============================
const getAllRentalSpaces = async (
    filters: IRentalSpaceFilterRequest,
    options: IPaginationOptions
) => {
    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(options);

    const { searchTerm, location, availability } = filters;

    const andConditions: Prisma.RentalSpaceWhereInput[] = [
        {
            isDeleted: false, // ✅ IMPORTANT FIX
        },
    ];

    // search
    if (searchTerm) {
        andConditions.push({
            location: {
                contains: searchTerm,
                mode: "insensitive",
            },
        });
    }

    // exact location
    if (location) {
        andConditions.push({
            location: {
                equals: location,
                mode: "insensitive",
            },
        });
    }

    // availability
    if (availability !== undefined) {
        const boolValue =
            availability === "true" || availability === true;

        andConditions.push({
            availability: boolValue,
        });
    }

    const where: Prisma.RentalSpaceWhereInput = {
        AND: andConditions,
    };

    const orderBy: Prisma.RentalSpaceOrderByWithRelationInput = sortBy
        ? { [sortBy]: sortOrder === "asc" ? "asc" : "desc" }
        : { createdAt: "desc" };

    const [data, total] = await Promise.all([
        prisma.rentalSpace.findMany({
            where,
            skip,
            take: limit,
            orderBy,

            select: {
                id: true,
                location: true,
                size: true,
                price: true,
                availability: true,
                createdAt: true,
                updatedAt: true,

                vendor: {
                    select: {
                        id: true,
                        farmName: true,
                        farmLocation: true,
                        certificationStatus: true,
                    },
                },
            },
        }),

        prisma.rentalSpace.count({ where }),
    ]);

    return {
        meta: {
            total,
            page: page || 1,
            limit: limit || 10,
        },
        data,
    };
};

// ============================= GET SINGLE =============================
const getSingleRentalSpace = async (id: string) => {
    return prisma.rentalSpace.findFirst({
        where: {
            id,
            isDeleted: false, // ✅ FIX
        },

        select: {
            id: true,
            location: true,
            size: true,
            price: true,
            availability: true,
            createdAt: true,
            updatedAt: true,

            vendor: {
                select: {
                    id: true,
                    farmName: true,
                    farmLocation: true,
                    certificationStatus: true,
                    userId: true,
                },
            },
        },
    });
};

// ============================= UPDATE =============================
const updateRentalSpaceInDB = async (
    id: string,
    payload: Partial<RentalSpace>
): Promise<RentalSpace> => {
    return prisma.rentalSpace.update({
        where: { id },
        data: payload,
    });
};

// ============================= DELETE =============================
const deleteRentalSpaceFromDB = async (id: string): Promise<RentalSpace> => {
    return prisma.rentalSpace.update({
        where: { id },
        data: {
            isDeleted: true,
        },
    });
};

// ============================= EXPORT =============================
export const RentalSpaceService = {
    createRentalSpace,
    getAllRentalSpaces,
    getSingleRentalSpace,
    updateRentalSpaceInDB,
    deleteRentalSpaceFromDB,
};