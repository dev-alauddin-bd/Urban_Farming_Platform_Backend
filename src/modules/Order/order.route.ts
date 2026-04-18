import express, { Router } from 'express';
import { OrderController } from './order.controller.js';
import auth from '../../middlewares/auth.js';
import { UserRole } from '@prisma/client';

const router = express.Router();

// ================= CREATE ORDER =================
router.post(
    '/',
    auth(UserRole.CUSTOMER),
    OrderController.createOrder
);

// ================= MY ORDERS (cached) =================
router.get(
    '/my-orders',
    auth(UserRole.CUSTOMER),

    OrderController.getMyOrders
);

// ================= VENDOR ORDERS (cached) =================
router.get(
    '/vendor-orders',
    auth(UserRole.VENDOR),

    OrderController.getVendorOrders
);

export const OrderRoutes: Router = router;