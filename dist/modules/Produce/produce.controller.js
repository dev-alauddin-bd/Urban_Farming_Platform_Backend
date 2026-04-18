import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { ProduceService } from './produce.service.js';
import pick from '../../utils/pick.js';
import NodeCache from 'node-cache';
// ================= CACHE =================
const cache = new NodeCache({ stdTTL: 120 }); // 2 min cache
const CACHE_KEY = 'produces:list';
// ===================================== Create Produce =====================================
const createProduce = catchAsync(async (req, res) => {
    const result = await ProduceService.createProduce(req.body, req.user);
    cache.flushAll(); // invalidate all produce cache
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Produce listed successfully!',
        data: result,
    });
});
// ===================================== Get All Produces =====================================
const getAllProduces = catchAsync(async (req, res) => {
    const filters = pick(req.query, [
        'searchTerm',
        'category',
        'certificationStatus'
    ]);
    const options = pick(req.query, [
        'limit',
        'page',
        'sortBy',
        'sortOrder'
    ]);
    const key = `${CACHE_KEY}:${JSON.stringify(filters)}:${JSON.stringify(options)}`;
    const cached = cache.get(key);
    if (cached) {
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Produces fetched successfully (cache)!',
            meta: cached.meta,
            data: cached.data,
        });
    }
    const result = await ProduceService.getAllProduces(filters, options);
    cache.set(key, result);
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
    const cacheKey = `produce:${id}`;
    const cached = cache.get(cacheKey);
    if (cached) {
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Produce fetched successfully (cache)!',
            data: cached,
        });
    }
    const result = await ProduceService.getSingleProduceFromDB(id);
    cache.set(cacheKey, result);
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
    cache.del(CACHE_KEY);
    cache.del(`produce:${id}`);
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
    cache.del(CACHE_KEY);
    cache.del(`produce:${id}`);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Produce deleted successfully!',
        data: result,
    });
});
// ===================================== Export =====================================
export const ProduceController = {
    createProduce,
    getAllProduces,
    getSingleProduce,
    updateProduce,
    deleteProduce,
};
//# sourceMappingURL=produce.controller.js.map