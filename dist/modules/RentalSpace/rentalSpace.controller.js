import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import { RentalSpaceService } from './rentalSpace.service.js';
import sendResponse from '../../utils/sendResponse.js';
import pick from '../../utils/pick.js';
// ===================================== Create Rental Space =====================================
const createRentalSpace = catchAsync(async (req, res) => {
    const result = await RentalSpaceService.createRentalSpace(req.body, req.user);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Rental space created successfully!',
        data: result,
    });
});
// ===================================== Get All Rental Spaces =====================================
const getAllRentalSpaces = catchAsync(async (req, res) => {
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
// ===================================== Get Single Rental Space =====================================
const getSingleRentalSpace = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await RentalSpaceService.getSingleRentalSpace(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental space fetched successfully!',
        data: result,
    });
});
// ===================================== Update Rental Space =====================================
const updateRentalSpace = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await RentalSpaceService.updateRentalSpaceInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental space updated successfully!',
        data: result,
    });
});
// ===================================== Delete Rental Space =====================================
const deleteRentalSpace = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await RentalSpaceService.deleteRentalSpaceFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental space deleted successfully!',
        data: result,
    });
});
// ===================================== Export Rental Space Controller =====================================
export const RentalSpaceController = {
    createRentalSpace,
    getAllRentalSpaces,
    getSingleRentalSpace,
    updateRentalSpace,
    deleteRentalSpace,
};
//# sourceMappingURL=rentalSpace.controller.js.map