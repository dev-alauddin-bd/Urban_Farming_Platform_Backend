import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { UserRole, UserStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import AppError from "../../error/AppError.js";
import generateTokens from "../../utils/generateTokens.js";
import { verifyRefreshToken } from "../../utils/verifyTokens.js";
// ================= REGISTER =================
const registerUser = async (payload) => {
    // 1. check existing user
    const existingUser = await prisma.user.findUnique({
        where: { email: payload.email },
        select: { id: true }, // lightweight query (OPTIMIZED)
    });
    if (existingUser) {
        throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
    }
    // 2. hash password
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    // 3. transaction
    const user = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                role: payload.role,
                password: hashedPassword,
                status: payload.role === UserRole.VENDOR
                    ? UserStatus.PENDING
                    : UserStatus.ACTIVE,
            },
        });
        // 4. vendor profile (only if vendor)
        if (newUser.role === UserRole.VENDOR) {
            await tx.vendorProfile.create({
                data: {
                    userId: newUser.id,
                    farmName: payload.farmName ?? "N/A",
                    farmLocation: payload.farmLocation ?? "N/A",
                    certificationStatus: "PENDING",
                },
            });
        }
        return newUser;
    });
    // 5. JWT payload
    const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const tokens = generateTokens(tokenPayload);
    // 6. remove password safely
    const { password, ...safeUser } = user;
    return {
        ...tokens,
        user: safeUser,
    };
};
// ================= LOGIN =================
const loginUser = async (payload) => {
    const user = await prisma.user.findUnique({
        where: { email: payload.email },
    });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    if (user.status === UserStatus.BLOCKED) {
        throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
    }
    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid credentials");
    }
    const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const tokens = generateTokens(tokenPayload);
    const { password, ...safeUser } = user;
    return {
        ...tokens,
        user: safeUser,
    };
};
// ================= REFRESH TOKEN =================
const refreshToken = async (token) => {
    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token missing");
    }
    let decoded;
    try {
        decoded = verifyRefreshToken(token);
    }
    catch {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
    }
    const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
            id: true,
            email: true,
            role: true,
            status: true,
        },
    });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    if (user.status === UserStatus.BLOCKED) {
        throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
    }
    const newTokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const { accessToken } = generateTokens(newTokenPayload);
    return { accessToken };
};
// ================= EXPORT =================
export const AuthService = {
    registerUser,
    loginUser,
    refreshToken,
};
//# sourceMappingURL=auth.service.js.map