import { Prisma, Produce } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { paginationHelpers } from "../../utils/pagination.js";
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

const createProduce = async (data: Produce, user: TokenPayload): Promise<Produce> => {
    const vendor = await prisma.vendorProfile.findUnique({
        where: { userId: user.id },
    });

    if (!vendor) {
        throw new Error('Vendor profile not found!');
    }

    const result = await prisma.produce.create({
        data: {
            ...data,
            vendorId: vendor.id,
        },
    });

    return result;
};

const getAllProduces = async (filters: IProduceFilterRequest, options: IPaginationOptions) => {
    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(options);

    const { searchTerm, ...filterData } = filters;

    const andConditions: Prisma.ProduceWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
                {
                    description: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
            ],
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: (Object.keys(filterData) as (keyof typeof filterData)[]).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }

    const whereConditions: Prisma.ProduceWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.produce.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            vendor: true,
        },
    });

    const total = await prisma.produce.count({
        where: whereConditions,
    });

    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
};

const getSingleProduceFromDB = async (id: string) => {
    const result = await prisma.produce.findUnique({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            vendor: true,
        },
    });

    return result;
};

const updateProduceInDB = async (id: string, payload: Partial<Produce>) => {
    const result = await prisma.produce.update({
        where: {
            id,
        },
        data: payload,
    });

    return result;
};

const deleteProduceFromDB = async (id: string) => {
    const result = await prisma.produce.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });

    return result;
};

export const ProduceService = {
    createProduce,
    getAllProduces,
    getSingleProduceFromDB,
    updateProduceInDB,
    deleteProduceFromDB,
};
