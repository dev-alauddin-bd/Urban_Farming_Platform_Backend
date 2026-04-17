import { paginationHelpers } from '../../utils/pagination.js';
import { prisma } from '../../lib/prisma.js';
import { CommunityPost } from '@prisma/client';

// ==================== Create Post ====================

const createPost = async (data: any, user: any): Promise<CommunityPost> => {
    const result = await prisma.communityPost.create({
        data: {
            userId: user.id,
            postContent: data.postContent,
        },
    });
    return result;
};

// ==================== Get All Posts ====================
const getAllPosts = async (options: any) => {
    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(options);

    const result = await prisma.communityPost.findMany({
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    const total = await prisma.communityPost.count();

    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
};

// ==================== Export Service ====================

export const CommunityService = {
    createPost,
    getAllPosts,
};
