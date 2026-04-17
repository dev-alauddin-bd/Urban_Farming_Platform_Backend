import express, { Router } from 'express';
import { CommunityController } from './community.controller.js';
import auth from '../../middlewares/auth.js';

const router = express.Router();

// ==================== Create Post ====================

router.post(
    '/',
    auth(),
    CommunityController.createPost
);

// ==================== Get All Posts ====================

router.get('/', CommunityController.getAllPosts);

export const CommunityRoutes: Router = router;
