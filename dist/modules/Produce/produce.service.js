import { prisma } from "../../lib/prisma.js";
import { paginationHelpers } from "../../utils/pagination.js";
const createProduce = async (data, user) => {
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
const getAllProduces = async (filters, options) => {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    const andConditions = [];
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
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
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
const getSingleProduceFromDB = async (id) => {
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
const updateProduceInDB = async (id, payload) => {
    const result = await prisma.produce.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
};
const deleteProduceFromDB = async (id) => {
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
//# sourceMappingURL=produce.service.js.map