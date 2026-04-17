import express, { Router } from 'express';
import { PlantController } from './plant.controller.js';
import auth from '../../middlewares/auth.js';
import { UserRole } from '@prisma/client';

const router = express.Router();

/**
 * @swagger
 * /plants:
 *   post:
 *     summary: Add a new plant to tracking
 *     tags: [Plant Tracking]
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
 *               species: {type: string}
 *               plantingDate: {type: string, format: date-time}
 *               expectedHarvest: {type: string, format: date-time}
 *     responses:
 *       201:
 *         description: Plant added successfully
 */
router.post(
    '/',
    auth(UserRole.CUSTOMER, UserRole.VENDOR),
    PlantController.createPlant
);

/**
 * @swagger
 * /plants/my-plants:
 *   get:
 *     summary: Get all plants for the logged-in user
 *     tags: [Plant Tracking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Plants fetched successfully
 */
router.get(
    '/my-plants',
    auth(UserRole.CUSTOMER, UserRole.VENDOR),
    PlantController.getMyPlants
);

/**
 * @swagger
 * /plants/{id}:
 *   patch:
 *     summary: Update plant status or health
 *     tags: [Plant Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: {type: string}
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: {type: string}
 *               healthStatus: {type: string}
 *     responses:
 *       200:
 *         description: Plant status updated successfully
 */
router.patch(
    '/:id',
    auth(UserRole.CUSTOMER, UserRole.VENDOR),
    PlantController.updatePlantStatus
);

export const PlantRoutes: Router = router;
