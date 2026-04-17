import express, { Router } from 'express';
import { OrderController } from './order.controller.js';
import auth from '../../middlewares/auth.js';
import { UserRole } from '@prisma/client';

const router = express.Router();

// ===================================== Create Order =====================================
router.post(
    '/',
    auth(UserRole.CUSTOMER, UserRole.ADMIN),
    OrderController.createOrder
);

// ===================================== Get My Orders =====================================
router.get(
    '/my-orders',
    auth(UserRole.CUSTOMER, UserRole.ADMIN),
    OrderController.getMyOrders
);

export const OrderRoutes: Router = router;
