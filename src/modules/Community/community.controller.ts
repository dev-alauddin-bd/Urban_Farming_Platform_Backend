import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { CommunityService } from './community.service.js';
import pick from '../../utils/pick.js';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 });

const CACHE_KEY = 'community:posts';

// ================= CREATE POST =================
const createPost = catchAsync(async (req: Request, res: Response) => {
    const result = await CommunityService.createPost(req.body, req.user);

    cache.del(CACHE_KEY); // invalidate

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Post created successfully!',
        data: result,
    });
});

// ================= GET ALL POSTS =================
const getAllPosts = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, [
        'limit',
        'page',
        'sortBy',
        'sortOrder',
    ]);

    const key = `${CACHE_KEY}:${JSON.stringify(options)}`;

    const cached = cache.get(key);

    if (cached) {
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Posts fetched successfully (cache)',
            meta: (cached as any).meta,
            data: (cached as any).data,
        });
    }

    const result = await CommunityService.getAllPosts(options);

    cache.set(key, result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Posts fetched successfully!',
        meta: result.meta,
        data: result.data,
    });
});

export const CommunityController = {
    createPost,
    getAllPosts,
};