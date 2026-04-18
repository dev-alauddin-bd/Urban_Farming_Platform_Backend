import express, { Router } from 'express';
import { CommunityController } from './community.controller.js';
import auth from '../../middlewares/auth.js';
import { UserRole } from '@prisma/client';
import { communityLimiter } from '../../middlewares/rateLimiter.js';

const router = express.Router();

// ================= CREATE POST =================
router.post(
    '/',
    auth(UserRole.CUSTOMER, UserRole.VENDOR, UserRole.ADMIN),
    communityLimiter,
    CommunityController.createPost
);

// ================= GET ALL POSTS (cached + paginated) =================
router.get(
    '/',

    CommunityController.getAllPosts
);

export const CommunityRoutes: Router = router;