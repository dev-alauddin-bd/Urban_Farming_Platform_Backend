import { Order, Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { paginationHelpers } from '../../utils/pagination.js';
import { TokenPayload } from '../../utils/generateTokens.js';

type IOrderRequest = {
    produceId: string;
    quantity: number;
};

type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};

const createOrder = async (data: IOrderRequest, user: TokenPayload): Promise<Order> => {
    // 1. Check if produce exists
    const produce = await prisma.produce.findUnique({
        where: { id: data.produceId },
    });

    if (!produce) {
        throw new Error('Produce not found!');
    }

    // 2. Check if sufficient quantity is available
    if (produce.availableQuantity < data.quantity) {
        throw new Error('Insufficient quantity available!');
    }

    // 3. Calculate total price
    const totalPrice = Number(produce.price) * data.quantity;

    // 4. Use transaction to create order and decrement quantity
    const result = await prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
            data: {
                customerId: user.id,
                produceId: data.produceId,
                quantity: data.quantity,
                totalPrice: new Prisma.Decimal(totalPrice),
            },
        });

        await tx.produce.update({
            where: { id: produce.id },
            data: {
                availableQuantity: {
                    decrement: data.quantity,
                },
            },
        });

        return order;
    });

    return result;
};

const getMyOrders = async (user: TokenPayload, options: IPaginationOptions) => {
    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(options);

    const result = await prisma.order.findMany({
        where: { customerId: user.id },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            produce: {
                include: {
                    vendor: true
                }
            }
        },
    });

    const total = await prisma.order.count({
        where: { customerId: user.id },
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

export const OrderService = {
    createOrder,
    getMyOrders,
};
