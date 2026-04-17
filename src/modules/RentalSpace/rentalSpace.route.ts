import express, { Router } from 'express';
import { RentalSpaceController } from './rentalSpace.controller';
import auth from '../../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
    '/',
    auth(UserRole.VENDOR, UserRole.ADMIN),
    RentalSpaceController.createRentalSpace
);

router.get('/', RentalSpaceController.getAllRentalSpaces);
router.get('/:id', RentalSpaceController.getSingleRentalSpace);

export const RentalSpaceRoutes :Router= router;
