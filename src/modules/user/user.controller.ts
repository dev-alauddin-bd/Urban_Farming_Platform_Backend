import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { UserService } from "./user.service.js";
import { UserStatus } from "@prisma/client";

// ==================== Get All Users ====================
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getAllUsersFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users fetched successfully!",
        data: result,
    });
});

// ==================== Get Single User ====================

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.getSingleUserFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User fetched successfully!",
        data: result,
    });
});

// ==================== Get My Profile ====================

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await UserService.getMyProfileFromDB(user);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile fetched successfully!",
        data: result,
    });
});

// ==================== Update My Profile ====================

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await UserService.updateMyProfileInDB(user, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile updated successfully!",
        data: result,
    });
});

// ==================== Change User Status ====================

const changeUserStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await UserService.changeUserStatusInDB(id as string, status as UserStatus);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User status changed successfully!",
        data: result,
    });
});

// ==================== Delete User ====================

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.deleteUserFromDB(id as string);

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
