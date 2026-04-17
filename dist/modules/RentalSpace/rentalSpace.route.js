import express from 'express';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth.js';
import { RentalSpaceController } from './rentalSpace.controller.js';
const router = express.Router();
// ===================================== Create Rental Space =====================================
router.post('/', auth(UserRole.VENDOR, UserRole.ADMIN), RentalSpaceController.createRentalSpace);
// ===================================== Get All Rental Spaces =====================================
router.get('/', RentalSpaceController.getAllRentalSpaces);
// ===================================== Get Single Rental Space =====================================
router.get('/:id', RentalSpaceController.getSingleRentalSpace);
// ===================================== Update Rental Space =====================================
router.patch('/:id', auth(UserRole.VENDOR, UserRole.ADMIN), RentalSpaceController.updateRentalSpace);
// ===================================== Delete Rental Space =====================================
router.delete('/:id', auth(UserRole.VENDOR, UserRole.ADMIN), RentalSpaceController.deleteRentalSpace);
export const RentalSpaceRoutes = router;
//# sourceMappingURL=rentalSpace.route.js.map