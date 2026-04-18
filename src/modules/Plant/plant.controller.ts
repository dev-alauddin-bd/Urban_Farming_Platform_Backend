import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { PlantService } from './plant.service.js';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 });

// ================= CREATE PLANT =================
const createPlant = catchAsync(async (req: Request, res: Response) => {
    const result = await PlantService.createPlant(req.body, req.user);

    cache.del(`plants:user:${req.user.id}`);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Plant added to tracking successfully!',
        data: result,
    });
});

// ================= GET MY PLANTS =================
const getMyPlants = catchAsync(async (req: Request, res: Response) => {
    const key = `plants:user:${req.user.id}`;

    const cached = cache.get(key);
    if (cached) {
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Your plants fetched successfully (cache)',
            data: cached,
        });
    }

    const result = await PlantService.getMyPlants(req.user);

    cache.set(key, result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Your plants fetched successfully!',
        data: result,
    });
});

// ================= UPDATE PLANT =================
const updatePlantStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await PlantService.updatePlantStatus(id as string, req.body);

    // invalidate all user caches (simple safe approach)
    cache.flushAll();

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