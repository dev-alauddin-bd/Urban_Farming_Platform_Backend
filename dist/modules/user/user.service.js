import { prisma } from "../../lib/prisma.js";
import AppError from "../../error/AppError.js";
import httpStatus from "http-status";
// ================= GET ALL USERS =================
const getAllUsersFromDB = async () => {
    return prisma.user.findMany({
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
            // ❌ avoid full object (performance fix)
            vendorProfile: {
                select: {
                    id: true,
                    farmName: true,
                    farmLocation: true,
                    certificationStatus: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
// ================= GET SINGLE USER =================
const getSingleUserFromDB = async (id) => {
    const result = await prisma.user.findFirst({
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
            vendorProfile: {
                select: {
                    id: true,
                    farmName: true,
                    farmLocation: true,
                    certificationStatus: true,
                },
            },
        },
    });
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }
    return result;
};
// ================= MY PROFILE =================
const getMyProfileFromDB = async (user) => {
    const result = await prisma.user.findFirst({
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
            vendorProfile: {
                select: {
                    id: true,
                    farmName: true,
                    farmLocation: true,
                    certificationStatus: true,
                },
            },
        },
    });
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found!");
    }
    return result;
};
// ================= UPDATE PROFILE =================
const updateMyProfileInDB = async (user, payload) => {
    const isExistUser = await prisma.user.findFirst({
        where: {
            id: user.id,
            isDeleted: false,
        },
    });
    if (!isExistUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }
    // ❌ prevent role/status hacking from body
    const { role, status, isDeleted, ...safePayload } = payload;
    return prisma.user.update({
        where: {
            id: user.id,
        },
        data: safePayload,
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
};
// ================= SOFT DELETE USER =================
const deleteUserFromDB = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }
    return prisma.user.update({
        where: { id },
        data: {
            isDeleted: true,
        },
    });
};
// ================= CHANGE STATUS =================
const changeUserStatusInDB = async (id, status) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }
    return prisma.user.update({
        where: { id },
        data: {
            status,
        },
    });
};
// ================= EXPORT =================
export const UserService = {
    getAllUsersFromDB,
    getSingleUserFromDB,
    getMyProfileFromDB,
    updateMyProfileInDB,
    deleteUserFromDB,
    changeUserStatusInDB,
};
//# sourceMappingURL=user.service.js.map