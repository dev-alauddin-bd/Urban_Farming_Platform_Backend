import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { ProduceService } from './produce.service.js';
import pick from '../../utils/pick.js';
// ===================================== Create Produce =====================================
const createProduce = catchAsync(async (req, res) => {
    const result = await ProduceService.createProduce(req.body, req.user);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Produce listed successfully!',
        data: result,
    });
});
// ===================================== Get All Produces =====================================
const getAllProduces = catchAsync(async (req, res) => {
    const filters = pick(req.query, ['searchTerm', 'category', 'certificationStatus']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await ProduceService.getAllProduces(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Produces fetched successfully!',
        meta: result.meta,
        data: result.data,
    });
});
// ===================================== Get Single Produce =====================================
const getSingleProduce = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ProduceService.getSingleProduceFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Produce fetched successfully!',
        data: result,
    });
});
// ===================================== Update Produce =====================================
const updateProduce = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ProduceService.updateProduceInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Produce updated successfully!',
        data: result,
    });
});
// ===================================== Delete Produce =====================================
const deleteProduce = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ProduceService.deleteProduceFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Produce deleted successfully!',
        data: result,
    });
});
// ===================================== Export Produce Controller =====================================
export const ProduceController = {
    createProduce,
    getAllProduces,
    getSingleProduce,
    updateProduce,
    deleteProduce,
};
//# sourceMappingURL=produce.controller.js.map