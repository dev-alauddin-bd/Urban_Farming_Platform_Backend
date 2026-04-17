import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { UserRole, UserStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import AppError from "../../error/AppError.js";
import generateTokens from "../../utils/generateTokens.js";
import { verifyRefreshToken } from "../../utils/verifyTokens.js";
// ================= REGISTER =================
const registerUser = async (payload) => {
    // 1. check if user already exists by email
    const isExistUser = await prisma.user.findUnique({
        where: { email: payload.email },
    });
    // 2. if user exists → throw error
    if (isExistUser) {
        throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
    }
    // 3. hash password before saving (security)
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    // 4. use transaction for atomic operations
    const user = await prisma.$transaction(async (tx) => {
        // 5. create user in DB
        const newUser = await tx.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                role: payload.role,
                // store hashed password only
                password: hashedPassword,
                // 6. if vendor → PENDING else ACTIVE
                status: payload.role === UserRole.VENDOR
                    ? UserStatus.PENDING
                    : UserStatus.ACTIVE,
            },
        });
        // 7. if user is vendor → create vendor profile
        if (newUser.role === UserRole.VENDOR) {
            await tx.vendorProfile.create({
                data: {
                    userId: newUser.id,
                    farmName: payload.farmName || "N/A",
                    farmLocation: payload.farmLocation || "N/A",
                    certificationStatus: "PENDING",
                },
            });
        }
        // 8. return created user
        return newUser;
    });
    // 9. remove password before returning response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
// ================= LOGIN =================
const loginUser = async (payload) => {
    // 1. find user by email
    const user = await prisma.user.findUnique({
        where: { email: payload.email },
    });
    // 2. if not found → error
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    // 3. if blocked user → deny access
    if (user.status === UserStatus.BLOCKED) {
        throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
    }
    // 4. compare password with hashed password
    const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid credentials");
    }
    // 5. create JWT payload
    const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    // 6. generate access + refresh token
    const { accessToken, refreshToken } = generateTokens(tokenPayload);
    // 7. remove password before sending response
    const { password, ...userWithoutPassword } = user;
    return {
        accessToken,
        refreshToken,
        user: userWithoutPassword,
    };
};
// ================= REFRESH TOKEN =================
const refreshToken = async (token) => {
    // 1. check token exists
    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token missing");
    }
    let decoded;
    // 2. verify refresh token (decode JWT safely)
    try {
        decoded = verifyRefreshToken(token);
    }
    catch (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
    }
    // 3. check user still exists in DB
    const user = await prisma.user.findUnique({
        where: { id: decoded.id },
    });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    // 4. block check
    if (user.status === UserStatus.BLOCKED) {
        throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
    }
    // 5. create new payload for new access token
    const newPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    // 6. generate new access token
    const { accessToken } = generateTokens(newPayload);
    return { accessToken };
};
// ================= EXPORT SERVICE =================
export const AuthService = {
    registerUser,
    loginUser,
    refreshToken,
};
//# sourceMappingURL=auth.service.js.map