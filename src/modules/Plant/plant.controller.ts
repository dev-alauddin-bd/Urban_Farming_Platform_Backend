import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { PlantService } from './plant.service.js';

// 
const createPlant = catchAsync(async (req: Request, res: Response) => {
    const result = await PlantService.createPlant(req.body, req.user);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Plant added to tracking successfully!',
        data: result,
    });
});

const getMyPlants = catchAsync(async (req: Request, res: Response) => {
    const result = await PlantService.getMyPlants(req.user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Your plants fetched successfully!',
        data: result,
    });
});

const updatePlantStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PlantService.updatePlantStatus(id as string, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Plant status updated successfully!',
        data: result,
    });
});

export const PlantController = {
    createPlant,
    getMyPlants,
    updatePlantStatus,
};
