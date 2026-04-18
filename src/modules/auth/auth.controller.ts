import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import { AuthService } from "./auth.service.js";
import sendResponse from "../../utils/sendResponse.js";
import AppError from "../../error/AppError.js";

// ================= REGISTER =================
const registerUser = catchAsync(async (req: Request, res: Response) => {
    const { accessToken, refreshToken, user } =
        await AuthService.registerUser(req.body);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully!",
        data: { user ,accessToken},
    });
});

// ================= LOGIN =================
const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { accessToken, refreshToken, user } =
        await AuthService.loginUser(req.body);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully!",
        data: { user ,accessToken},
    });
});

// ================= LOGOUT =================
const logoutUser = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged out successfully!",
        data: null,
    });
});

// ================= REFRESH TOKEN =================
const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken;

    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token not found");
    }

    const result = await AuthService.refreshToken(token);

    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Token refreshed successfully!",
        data: { accessToken: result.accessToken },
    });
});

export const AuthController = {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
};