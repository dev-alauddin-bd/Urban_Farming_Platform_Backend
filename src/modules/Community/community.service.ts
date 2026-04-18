import { prisma } from '../../lib/prisma.js';
import { CommunityPost, Prisma } from '@prisma/client';
import { TokenPayload } from '../../utils/generateTokens.js';
import { paginationHelpers } from '../../utils/pagination.js';

type ICommunityPostRequest = {
    postContent: string;
};

type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};

// ================= CREATE POST =================
const createPost = async (
    data: ICommunityPostRequest,
    user: TokenPayload
): Promise<CommunityPost> => {
    return prisma.communityPost.create({
        data: {
            userId: user.id,
            postContent: data.postContent,
        },
    });
};

// ================= GET ALL POSTS (OPTIMIZED) =================
const getAllPosts = async (options: IPaginationOptions) => {
    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(options);

    const allowedSortFields = ['postDate', 'updatedAt', 'id'];

    const safeSortBy = allowedSortFields.includes(sortBy || '')
        ? sortBy!
        : 'postDate';

    const orderBy: Prisma.CommunityPostOrderByWithRelationInput = {
        [safeSortBy]: (sortOrder === 'asc' ? 'asc' : 'desc') as Prisma.SortOrder,
    };

    // 1️⃣ posts only (no include)
    const [posts, total] = await Promise.all([
        prisma.communityPost.findMany({
            where: {
                isDeleted: false,
            },
            skip,
            take: limit,
            orderBy,
            select: {
                id: true,
                postContent: true,
                postDate: true,
                userId: true, // needed for manual join
            },
        }),

        prisma.communityPost.count({
            where: {
                isDeleted: false,
            },
        }),
    ]);

    // 2️⃣ manual join (FAST alternative to include)
    const userIds = [...new Set(posts.map(p => p.userId))];

    const users = await prisma.user.findMany({
        where: {
            id: { in: userIds },
        },
        select: {
            id: true,
            name: true,
        },
    });

    const userMap = new Map(users.map(u => [u.id, u]));

    // 3️⃣ merge response
    const data = posts.map(post => ({
        id: post.id,
        postContent: post.postContent,
        postDate: post.postDate,
        user: userMap.get(post.userId) ?? null,
    }));

    return {
        meta: {
            total,
            page: page ?? 1,
            limit: limit ?? 10,
        },
        data,
    };
};

export const CommunityService = {
    createPost,
    getAllPosts,
};