import { Order, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { paginationHelpers } from "../../utils/pagination.js";
import { TokenPayload } from "../../utils/generateTokens.js";

type IOrderRequest = {
    produceId: string;
    quantity: number;
};

type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};

// ============================= CREATE ORDER (RACE CONDITION FIX) =============================
const createOrder = async (
    data: IOrderRequest,
    user: TokenPayload
): Promise<Order> => {
    if (data.quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
    }

    return prisma.$transaction(async (tx) => {
        // 🔒 lock row (prevent race condition)
        const produce = await tx.produce.findUnique({
            where: { id: data.produceId },
        });

        if (!produce || produce.isDeleted) {
            throw new Error("Produce not found!");
        }

        if (produce.availableQuantity < data.quantity) {
            throw new Error("Insufficient quantity available!");
        }

        const totalPrice = Number(produce.price) * data.quantity;

        const order = await tx.order.create({
            data: {
                customerId: user.id,
                produceId: data.produceId,
                quantity: data.quantity,
                totalPrice: new Prisma.Decimal(totalPrice),
                orderDate: new Date(),
            },
        });

        await tx.produce.update({
            where: { id: data.produceId },
            data: {
                availableQuantity: {
                    decrement: data.quantity,
                },
            },
        });

        return order;
    });
};

// ============================= MY ORDERS =============================
const getMyOrders = async (
    user: TokenPayload,
    options: IPaginationOptions
) => {
    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(options);

    const allowedSortFields = [
        "orderDate",
        "updatedAt",
        "totalPrice",
        "quantity",
        "status",
    ];

    const safeSortBy = allowedSortFields.includes(sortBy || "")
        ? sortBy!
        : "orderDate";

    const where = {
        customerId: user.id,
        isDeleted: false,
    };

    const [data, total] = await Promise.all([
        prisma.order.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                [safeSortBy]: sortOrder || "desc",
            },

            select: {
                id: true,
                quantity: true,
                totalPrice: true,
                orderDate: true,
                status: true,
                updatedAt: true,

                produce: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        category: true,

                        vendor: {
                            select: {
                                id: true,
                                farmName: true,
                                farmLocation: true,
                            },
                        },
                    },
                },
            },
        }),

        prisma.order.count({ where }),
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

// ============================= VENDOR ORDERS =============================
const getVendorOrders = async (
    user: TokenPayload,
    options: IPaginationOptions
) => {
    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(options);

    const allowedSortFields = [
        "orderDate",
        "updatedAt",
        "totalPrice",
        "quantity",
        "status",
    ];

    const safeSortBy = allowedSortFields.includes(sortBy || "")
        ? sortBy!
        : "orderDate";

    const where = {
        isDeleted: false,
        produce: {
            vendor: {
                userId: user.id,
            },
        },
    };

    const [data, total] = await Promise.all([
        prisma.order.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                [safeSortBy]: sortOrder || "desc",
            },

            select: {
                id: true,
                quantity: true,
                totalPrice: true,
                orderDate: true,
                status: true,

                customer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },

                produce: {
                    select: {
                        id: true,
                        name: true,
                        category: true,
                    },
                },
            },
        }),

        prisma.order.count({ where }),
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

// ============================= EXPORT =============================
export const OrderService = {
    createOrder,
    getMyOrders,
    getVendorOrders,
};