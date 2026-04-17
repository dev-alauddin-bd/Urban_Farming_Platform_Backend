import { RentalSpace, UserRole } from '@prisma/client';
import { paginationHelpers } from '../../../utils/pagination';
import { prisma } from '../../../lib/prisma';

const createRentalSpace = async (data: any, user: any): Promise<RentalSpace> => {
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

const getAllRentalSpaces = async (filters: any, options: any) => {
    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(options);

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
                    equals: (filterData as any)[key],
                },
            })),
        });
    }

    const whereConditions =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.rentalSpace.findMany({
        where: whereConditions as any,
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
        where: whereConditions as any,
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

const getSingleRentalSpace = async (id: string): Promise<RentalSpace | null> => {
    const result = await prisma.rentalSpace.findUnique({
        where: { id },
        include: { vendor: true },
    });
    return result;
};

export const RentalSpaceService = {
    createRentalSpace,
    getAllRentalSpaces,
    getSingleRentalSpace,
};
