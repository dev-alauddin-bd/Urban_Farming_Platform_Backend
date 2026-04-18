import express, { Router } from 'express';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth.js';

import { RentalSpaceController } from './rentalSpace.controller.js';

const router = express.Router();

// ================= CREATE RENTAL SPACE =================
router.post(
    '/',
    auth(UserRole.VENDOR),
    RentalSpaceController.createRentalSpace
);

// ================= GET ALL =================
router.get(
    '/',
 
    RentalSpaceController.getAllRentalSpaces
);

// ================= GET SINGLE  =================
router.get(
    '/:id',

    RentalSpaceController.getSingleRentalSpace
);

// ================= UPDATE =================
router.patch(
    '/:id',
    auth(UserRole.VENDOR),
    RentalSpaceController.updateRentalSpace
);

// ================= DELETE =================
router.delete(
    '/:id',
    auth(UserRole.VENDOR),
    RentalSpaceController.deleteRentalSpace
);

export const RentalSpaceRoutes: Router = router;