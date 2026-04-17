import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import { RentalSpaceService } from './rentalSpace.service.js';
import sendResponse from '../../utils/sendResponse.js';
import pick from '../../utils/pick.js';


const createRentalSpace = catchAsync(async (req: Request, res: Response) => {
    const result = await RentalSpaceService.createRentalSpace(req.body, req.user);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Rental space created successfully!',
        data: result,
    });
});

const getAllRentalSpaces = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ['searchTerm', 'location', 'availability']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await RentalSpaceService.getAllRentalSpaces(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental spaces fetched successfully!',
        meta: result.meta,
        data: result.data,
    });
});

const getSingleRentalSpace = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await RentalSpaceService.getSingleRentalSpace(id as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental space fetched successfully!',
        data: result,
    });
});

export const RentalSpaceController = {
    createRentalSpace,
    getAllRentalSpaces,
    getSingleRentalSpace,
};
