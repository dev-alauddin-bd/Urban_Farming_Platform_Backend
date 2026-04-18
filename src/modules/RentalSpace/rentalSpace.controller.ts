import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { RentalSpaceService } from './rentalSpace.service.js';
import pick from '../../utils/pick.js';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 120 }); // 2 minutes

const LIST_KEY = 'rental:spaces';

// ================================= CREATE =================================
const createRentalSpace = catchAsync(async (req: Request, res: Response) => {
    const result = await RentalSpaceService.createRentalSpace(req.body, req.user);

    cache.del(LIST_KEY);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Rental space created successfully!',
        data: result,
    });
});

// ================================= GET ALL (CACHED) =================================
const getAllRentalSpaces = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, [
        'searchTerm',
        'location',
        'availability',
    ]);

    const options = pick(req.query, [
        'limit',
        'page',
        'sortBy',
        'sortOrder',
    ]);

    const key = `${LIST_KEY}:${JSON.stringify(filters)}:${JSON.stringify(options)}`;

    const cached = cache.get(key);

    if (cached) {
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Rental spaces fetched successfully (cache)',
            meta: (cached as any).meta,
            data: (cached as any).data,
        });
    }

    const result = await RentalSpaceService.getAllRentalSpaces(filters, options);

    cache.set(key, result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental spaces fetched successfully!',
        meta: result.meta,
        data: result.data,
    });
});

// ================================= GET SINGLE =================================
const getSingleRentalSpace = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const key = `rental:space:${id}`;

    const cached = cache.get(key);

    if (cached) {
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Rental space fetched successfully (cache)',
            data: cached,
        });
    }

    const result = await RentalSpaceService.getSingleRentalSpace(id as string);

    cache.set(key, result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental space fetched successfully!',
        data: result,
    });
});

// ================================= UPDATE =================================
const updateRentalSpace = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await RentalSpaceService.updateRentalSpaceInDB(id as string, req.body);

    cache.del(LIST_KEY);
    cache.del(`rental:space:${id}`);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental space updated successfully!',
        data: result,
    });
});

// ================================= DELETE =================================
const deleteRentalSpace = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await RentalSpaceService.deleteRentalSpaceFromDB(id as string);

    cache.del(LIST_KEY);
    cache.del(`rental:space:${id}`);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental space deleted successfully!',
        data: result,
    });
});

export const RentalSpaceController = {
    createRentalSpace,
    getAllRentalSpaces,
    getSingleRentalSpace,
    updateRentalSpace,
    deleteRentalSpace,
};