import express, { Router } from 'express';
import { SustainabilityController } from './sustainability.controller.js';
import auth from '../../middlewares/auth.js';
import { UserRole } from '@prisma/client';

const router = express.Router();

// ================= UPLOAD CERT =================
router.post(
    '/upload',
    auth(UserRole.VENDOR),
    SustainabilityController.uploadCertification
);

// ================= GET ALL CERTS  =================
router.get(
    '/',
    auth(UserRole.ADMIN),
    SustainabilityController.getAllCertifications
);

// ================= VALIDATE CERT =================
router.patch(
    '/:id/validate',
    auth(UserRole.ADMIN),
    SustainabilityController.validateCertification
);

export const SustainabilityRoutes: Router = router;