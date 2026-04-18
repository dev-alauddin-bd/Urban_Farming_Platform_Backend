import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { OrderService } from './order.service.js';
import pick from '../../utils/pick.js';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 });

// ================= CREATE ORDER =================
const createOrder = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.createOrder(req.body, req.user);

    // invalidate user cache
    cache.del(`orders:user:${req.user.id}`);
    cache.del(`orders:vendor:${req.user.id}`);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Order placed successfully!',
        data: result,
    });
});

// ================= MY ORDERS =================
const getMyOrders = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const key = `orders:user:${req.user.id}:${JSON.stringify(options)}`;

    const cached = cache.get(key);
    if (cached) {
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Your orders fetched successfully (cache)',
            meta: (cached as any).meta,
            data: (cached as any).data,
        });
    }

    const result = await OrderService.getMyOrders(req.user, options);

    cache.set(key, result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Your orders fetched successfully!',
        meta: result.meta,
        data: result.data,
    });
});

// ================= VENDOR ORDERS =================
const getVendorOrders = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const key = `orders:vendor:${req.user.id}:${JSON.stringify(options)}`;

    const cached = cache.get(key);
    if (cached) {
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Vendor orders fetched successfully (cache)',
            meta: (cached as any).meta,
            data: (cached as any).data,
        });
    }

    const result = await OrderService.getVendorOrders(req.user, options);

    cache.set(key, result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Vendor orders fetched successfully!',
        meta: result.meta,
        data: result.data,
    });
});

export const OrderController = {
    createOrder,
    getMyOrders,
    getVendorOrders,
};