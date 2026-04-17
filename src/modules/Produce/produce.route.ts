import express, { Router } from 'express';
import { ProduceController } from './produce.controller.js';
import auth from '../../middlewares/auth.js';
import { UserRole } from '@prisma/client';

const router = express.Router();

/**
 * @swagger
 * /produces:
 *   post:
 *     summary: List a new produce (Vendor/Admin)
 *     tags: [Produce]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: {type: string}
 *               description: {type: string}
 *               price: {type: number}
 *               category: {type: string}
 *               availableQuantity: {type: number}
 *     responses:
 *       201:
 *         description: Produce listed successfully
 */
router.post(
    '/',
    auth(UserRole.VENDOR, UserRole.ADMIN),
    ProduceController.createProduce
);

/**
 * @swagger
 * /produces:
 *   get:
 *     summary: Get all produces with filters
 *     tags: [Produce]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema: {type: string}
 *       - in: query
 *         name: category
 *         schema: {type: string}
 *     responses:
 *       200:
 *         description: Produces fetched successfully
 */
router.get('/', ProduceController.getAllProduces);

router.get('/:id', ProduceController.getSingleProduce);

router.patch(
    '/:id',
    auth(UserRole.VENDOR, UserRole.ADMIN),
    ProduceController.updateProduce
);

router.delete(
    '/:id',
    auth(UserRole.VENDOR, UserRole.ADMIN),
    ProduceController.deleteProduce
);

export const ProduceRoutes : Router= router;
