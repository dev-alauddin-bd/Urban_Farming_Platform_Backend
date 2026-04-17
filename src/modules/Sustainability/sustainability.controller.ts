import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { SustainabilityService } from './sustainability.service.js';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';

// ==================== Upload Certification ====================

const uploadCertification = catchAsync(async (req: Request, res: Response) => {
    const result = await SustainabilityService.uploadCertification(req.body, req.user);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Certification uploaded successfully!',
        data: result,
    });
});
// ==================== Get All Certifications ====================
const getAllCertifications = catchAsync(async (req: Request, res: Response) => {
    const result = await SustainabilityService.getAllCertifications();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Certifications fetched successfully!',
        data: result,
    });
});
// ==================== Validate Certification ====================
const validateCertification = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SustainabilityService.validateCertification(id as string, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Certification status updated successfully!',
        data: result,
    });
});

// ==================== Export Controller ====================

export const SustainabilityController = {
    uploadCertification,
    getAllCertifications,
    validateCertification,
};
