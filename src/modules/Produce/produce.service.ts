import { Prisma, Produce, CertificationStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { paginationHelpers } from "../../utils/pagination.js";
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

// ================= CREATE =================
const createProduce = async (
    data: Omit<Produce, "id" | "vendorId" | "createdAt" | "updatedAt">,
    user: TokenPayload
): Promise<Produce> => {
    const vendor = await prisma.vendorProfile.findUnique({
        where: { userId: user.id },
    });

    if (!vendor) {
        throw new Error("Vendor profile not found!");
    }

    return prisma.produce.create({
        data: {
            ...data,
            vendorId: vendor.id,
        },
    });
};

// ================= GET ALL =================
const getAllProduces = async (
    filters: IProduceFilterRequest,
    options: IPaginationOptions
) => {
    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(options);

    const { searchTerm, category, certificationStatus } = filters;

    const andConditions: Prisma.ProduceWhereInput[] = [];

    // 🔍 search
    if (searchTerm) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }

    // 🎯 category
    if (category) {
        andConditions.push({
            category: {
                equals: category,
                mode: "insensitive",
            },
        });
    }

    // ✅ enum safe filter
    if (certificationStatus) {
        andConditions.push({
            certificationStatus,
        });
    }

    // ✅ ALWAYS include soft delete filter
    const where: Prisma.ProduceWhereInput = {
        AND: [
            { isDeleted: false },
            ...andConditions,
        ],
    };

    // ✅ safe sorting
    const allowedSortFields = [
        "createdAt",
        "price",
        "availableQuantity",
        "updatedAt",
    ];

    const safeSortBy = allowedSortFields.includes(sortBy || "")
        ? sortBy!
        : "createdAt";

    const orderBy: Prisma.ProduceOrderByWithRelationInput = {
        [safeSortBy]: sortOrder === "asc" ? "asc" : "desc",
    };

    const [data, total] = await Promise.all([
        prisma.produce.findMany({
            where,
            skip,
            take: limit,
            orderBy,

            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                category: true,
                availableQuantity: true,
                certificationStatus: true,
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

        prisma.produce.count({ where }),
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

// ================= GET SINGLE =================
const getSingleProduceFromDB = async (id: string) => {
    return prisma.produce.findFirst({
        where: {
            id,
            isDeleted: false,
        },

        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            category: true,
            availableQuantity: true,
            certificationStatus: true,
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

// ================= UPDATE =================
const updateProduceInDB = async (
    id: string,
    payload: Partial<Produce>
): Promise<Produce> => {
    return prisma.produce.update({
        where: {
            id,
            isDeleted: false, // ✅ safety
        },
        data: payload,
    });
};

// ================= DELETE =================
const deleteProduceFromDB = async (id: string): Promise<Produce> => {
    return prisma.produce.update({
        where: {
            id,
            isDeleted: false, // ✅ safety
        },
        data: {
            isDeleted: true,
        },
    });
};

// ================= EXPORT =================
export const ProduceService = {
    createProduce,
    getAllProduces,
    getSingleProduceFromDB,
    updateProduceInDB,
    deleteProduceFromDB,
};