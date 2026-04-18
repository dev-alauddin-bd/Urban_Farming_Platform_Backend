import express, { Router } from 'express';
import { PlantController } from './plant.controller.js';
import auth from '../../middlewares/auth.js';
import { UserRole } from '@prisma/client';

const router = express.Router();

// ================= CREATE PLANT =================
router.post(
    '/',
    auth(UserRole.CUSTOMER),
    PlantController.createPlant
);

// ================= GET MY PLANTS (cached) =================
router.get(
    '/my-plants',
    auth(UserRole.CUSTOMER),

    PlantController.getMyPlants
);

// ================= UPDATE PLANT =================
router.patch(
    '/:id',
    auth(UserRole.CUSTOMER),
    PlantController.updatePlantStatus
);

export const PlantRoutes: Router = router;