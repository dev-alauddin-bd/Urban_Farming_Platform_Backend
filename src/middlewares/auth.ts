import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import AppError from "../error/AppError.js";
import { UserRole } from "@prisma/client";
import catchAsync from "../utils/catchAsync.js";
import { TokenPayload } from "../utils/generateTokens.js";

// =============================== Auth middleware ===============================
const auth = (...requiredRoles: UserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        let token = req.headers.authorization || req.cookies?.accessToken;

        // Extract token from Bearer
        if (token && token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }

        // 1. Check if token is provided
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
        }

        // 2. Verify token
        let decoded: TokenPayload;
        try {
            decoded = jwt.verify(
                token,
                config.jwt_access_secret as string
            ) as TokenPayload;
        } catch (error) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token!");
        }

        // 3. Check if user has required role
        if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
            throw new AppError(
                httpStatus.FORBIDDEN,
                "You do not have permission to access this resource!"
            );
        }

        // 4. Attach user to request
        (req as any).user = decoded;
        next();
    });
};

export default auth;
