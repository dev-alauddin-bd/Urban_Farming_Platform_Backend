import { User, UserRole, UserStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import AppError from "../../error/AppError.js";
import httpStatus from "http-status";
import { TokenPayload } from "../../utils/generateTokens.js";

/**
 * Get all users from DB
 * @returns List of users (excluding passwords)
 */
const getAllUsersFromDB = async () => {
    const result = await prisma.user.findMany({
        where: {
            isDeleted: false,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            vendorProfile: true,
        },
    });
    return result;
};

/**
 * Get single user by ID
 * @param id User ID
 * @returns User object (excluding password)
 */
const getSingleUserFromDB = async (id: string) => {
    const result = await prisma.user.findUnique({
        where: {
            id,
            isDeleted: false,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            vendorProfile: true,
        },
    });

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    return result;
};

/**
 * Get my profile (logged in user)
 * @param user User payload from token
 * @returns User profile
 */
const getMyProfileFromDB = async (user: TokenPayload) => {
    const result = await prisma.user.findUnique({
        where: {
            id: user.id,
            isDeleted: false,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            vendorProfile: true,
        },
    });

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found!");
    }

    return result;
};

/**
 * Update my profile
 * @param user User payload from token
 * @param payload Update data
 * @returns Updated user
 */
const updateMyProfileInDB = async (user: TokenPayload, payload: Partial<User>) => {
    // 1. Check if user exists
    const isExistUser = await prisma.user.findUnique({
        where: {
            id: user.id,
            isDeleted: false,
        },
    });

    if (!isExistUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    // 2. Update user info
    const result = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: payload,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return result;
};

/**
 * Delete user (Soft delete)
 * @param id User ID
 * @returns Deleted user
 */
const deleteUserFromDB = async (id: string) => {
    const result = await prisma.user.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });

    return result;
};

/**
 * Change user status (Block/Unblock) - Admin only
 * @param id User ID
 * @param status New status
 * @returns Updated user
 */
const changeUserStatusInDB = async (id: string, status: UserStatus) => {
    const result = await prisma.user.update({
        where: {
            id,
        },
        data: {
            status,
        },
    });

    return result;
};

export const UserService = {
    getAllUsersFromDB,
    getSingleUserFromDB,
    getMyProfileFromDB,
    updateMyProfileInDB,
    deleteUserFromDB,
    changeUserStatusInDB,
};
