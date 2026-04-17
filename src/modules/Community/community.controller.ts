import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { CommunityService } from './community.service.js';
import pick from '../../utils/pick.js';

// ==================== Create Post ====================

const createPost = catchAsync(async (req: Request, res: Response) => {
    const result = await CommunityService.createPost(req.body, req.user);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Post created successfully!',
        data: result,
    });
});

// ==================== Get All Posts ====================

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await CommunityService.getAllPosts(options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Posts fetched successfully!',
        meta: result.meta,
        data: result.data,
    });
});

// ==================== Export Controller ====================

export const CommunityController = {
    createPost,
    getAllPosts,
};
