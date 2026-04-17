import { prisma } from "../../lib/prisma.js";
import { paginationHelpers } from "../../utils/pagination.js";
// =============================  Create Rental Space =============================
const createRentalSpace = async (data, user) => {
    const vendor = await prisma.vendorProfile.findUnique({
        where: { userId: user.id },
    });
    if (!vendor) {
        throw new Error('Vendor profile not found!');
    }
    const result = await prisma.rentalSpace.create({
        data: {
            ...data,
            vendorId: vendor.id,
        },
    });
    return result;
};
// =============================  Get All Rental Spaces =============================
const getAllRentalSpaces = async (filters, options) => {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: [
                {
                    location: {
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
    const result = await prisma.rentalSpace.findMany({
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
    const total = await prisma.rentalSpace.count({
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
// =============================  Get Single Rental Space =============================
const getSingleRentalSpace = async (id) => {
    const result = await prisma.rentalSpace.findUnique({
        where: { id },
        include: { vendor: true },
    });
    return result;
};
// =============================  Update Rental Space =============================
const updateRentalSpaceInDB = async (id, payload) => {
    const result = await prisma.rentalSpace.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
};
// =============================  Delete Rental Space =============================
const deleteRentalSpaceFromDB = async (id) => {
    const result = await prisma.rentalSpace.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });
    return result;
};
export const RentalSpaceService = {
    createRentalSpace,
    getAllRentalSpaces,
    getSingleRentalSpace,
    updateRentalSpaceInDB,
    deleteRentalSpaceFromDB,
};
//# sourceMappingURL=rentalSpace.service.js.map