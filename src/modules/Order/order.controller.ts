import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { OrderService } from './order.service.js';
import pick from '../../utils/pick.js';

// ===================================== Create Order =====================================
const createOrder = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.createOrder(req.body, req.user);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Order placed successfully!',
        data: result,
    });
});

// ===================================== Get My Orders =====================================
const getMyOrders = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await OrderService.getMyOrders(req.user, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Your orders fetched successfully!',
        meta: result.meta,
        data: result.data,
    });
});

export const OrderController = {
    createOrder,
    getMyOrders,
};
