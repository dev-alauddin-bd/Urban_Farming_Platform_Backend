import express from 'express';
import { ProduceController } from './produce.controller.js';
import auth from '../../middlewares/auth.js';
import { UserRole } from '@prisma/client';
const router = express.Router();
// CREATE
router.post('/', auth(UserRole.VENDOR, UserRole.ADMIN), ProduceController.createProduce);
// GET ALL 
router.get('/', ProduceController.getAllProduces);
// GET SINGLE 
router.get('/:id', ProduceController.getSingleProduce);
// UPDATE
router.patch('/:id', auth(UserRole.VENDOR, UserRole.ADMIN), ProduceController.updateProduce);
// DELETE
router.delete('/:id', auth(UserRole.VENDOR, UserRole.ADMIN), ProduceController.deleteProduce);
export const ProduceRoutes = router;
//# sourceMappingURL=produce.route.js.map