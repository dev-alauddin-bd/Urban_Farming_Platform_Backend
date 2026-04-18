import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { UserService } from "./user.service.js";
import { UserStatus } from "@prisma/client";
import NodeCache from "node-cache";

// ================= CACHE =================
const cache = new NodeCache({ stdTTL: 60 });

const USERS_CACHE_KEY = "users:list";

// ================= GET ALL USERS =================
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const cached = cache.get(USERS_CACHE_KEY);

    if (cached) {
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Users fetched successfully (cache)!",
            data: cached,
        });
    }

    const result = await UserService.getAllUsersFromDB();

    cache.set(USERS_CACHE_KEY, result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users fetched successfully!",
        data: result,
    });
});

// ================= GET SINGLE USER =================
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const cacheKey = `user:${id}`;
    const cached = cache.get(cacheKey);

    if (cached) {
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User fetched successfully (cache)!",
            data: cached,
        });
    }

    const result = await UserService.getSingleUserFromDB(id as string);

    cache.set(cacheKey, result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User fetched successfully!",
        data: result,
    });
});

// ================= MY PROFILE =================
const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const cacheKey = `profile:${req.user.id}`;

    const cached = cache.get(cacheKey);

    if (cached) {
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Profile fetched successfully (cache)!",
            data: cached,
        });
    }

    const result = await UserService.getMyProfileFromDB(req.user);

    cache.set(cacheKey, result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile fetched successfully!",
        data: result,
    });
});

// ================= UPDATE PROFILE =================
const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.updateMyProfileInDB(req.user, req.body);

    // invalidate profile cache
    cache.del(`profile:${req.user.id}`);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile updated successfully!",
        data: result,
    });
});

// ================= CHANGE STATUS =================
const changeUserStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const result = await UserService.changeUserStatusInDB(
        id as string,
        status as UserStatus
    );

    // invalidate cache
    cache.del("users:list");
    cache.del(`user:${id}`);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User status changed successfully!",
        data: result,
    });
});

// ================= DELETE USER =================
const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await UserService.deleteUserFromDB(id as string);

    // invalidate cache
    cache.del("users:list");
    cache.del(`user:${id}`);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User deleted successfully!",
        data: result,
    });
});

export const UserController = {
    getAllUsers,
    getSingleUser,
    getMyProfile,
    updateMyProfile,
    changeUserStatus,
    deleteUser,
};