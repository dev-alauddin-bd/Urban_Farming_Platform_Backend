import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import { AuthService } from "./auth.service.js";
import sendResponse from "../../utils/sendResponse.js";
import AppError from "../../error/AppError.js";


// ================= REGISTER =================
const registerUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.registerUser(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully!",
        data: result,
    });
});

// ================= LOGIN + COOKIE =================
const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { accessToken, refreshToken, user } =
        await AuthService.loginUser(req.body);

    // access token cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false, // production: true
        sameSite: "lax",
        maxAge: 15 * 60 * 1000, // 15 min
    });

    // refresh token cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully!",
        data: user,
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
    // get token from cookie
    const token = req.cookies?.refreshToken;

    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token not found");
    }

    const result = await AuthService.refreshToken(token);

    // optional: set new access token cookie
    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: false, // production: true
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Token refreshed successfully!",
        data: null, // usually we don't return token in body when using cookie
    });
});

export const AuthController = {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
};