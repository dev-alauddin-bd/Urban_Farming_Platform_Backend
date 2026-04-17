import { paginationHelpers } from '../../utils/pagination.js';
import { prisma } from '../../lib/prisma.js';
import { CommunityPost } from '@prisma/client';
import { TokenPayload } from '../../utils/generateTokens.js';

type ICommunityPostRequest = {
    postContent: string;
};

type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};

// ==================== Create Post ====================

const createPost = async (data: ICommunityPostRequest, user: TokenPayload): Promise<CommunityPost> => {
    const result = await prisma.communityPost.create({
        data: {
            userId: user.id,
            postContent: data.postContent,
        },
    });
    return result;
};

// ==================== Get All Posts ====================
const getAllPosts = async (options: IPaginationOptions) => {
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
