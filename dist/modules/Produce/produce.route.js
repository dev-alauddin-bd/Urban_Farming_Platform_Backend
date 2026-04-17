import express from 'express';
import { ProduceController } from './produce.controller.js';
import auth from '../../middlewares/auth.js';
import { UserRole } from '@prisma/client';
const router = express.Router();
// ===================================== Create Produce =====================================
router.post('/', auth(UserRole.VENDOR, UserRole.ADMIN), ProduceController.createProduce);
// ===================================== Get All Produces =====================================
router.get('/', ProduceController.getAllProduces);
// ===================================== Get Single Produce =====================================
router.get('/:id', ProduceController.getSingleProduce);
// ===================================== Update Produce =====================================
router.patch('/:id', auth(UserRole.VENDOR, UserRole.ADMIN), ProduceController.updateProduce);
// ===================================== Delete Produce =====================================
router.delete('/:id', auth(UserRole.VENDOR, UserRole.ADMIN), ProduceController.deleteProduce);
export const ProduceRoutes = router;
//# sourceMappingURL=produce.route.js.map