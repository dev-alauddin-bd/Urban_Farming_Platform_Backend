import express, { Router } from 'express';
import { SustainabilityController } from './sustainability.controller.js';
import auth from '../../middlewares/auth.js';
import { UserRole } from '@prisma/client';

const router = express.Router();

// ==================== Upload Certification ====================

router.post(
    '/upload',
    auth(UserRole.VENDOR, UserRole.ADMIN),
    SustainabilityController.uploadCertification
);

// ==================== Get All Certifications ====================

router.get(
    '/',
    auth(UserRole.ADMIN),
    SustainabilityController.getAllCertifications
);

// ==================== Validate Certification ====================

router.patch(
    '/:id/validate',
    auth(UserRole.ADMIN),
    SustainabilityController.validateCertification
);

// ==================== Export Route ====================

export const SustainabilityRoutes: Router = router;
