import { CertificationStatus, SustainabilityCert } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { TokenPayload } from '../../utils/generateTokens.js';

type IUploadCertificationRequest = {
    certifyingAgency: string;
    certificationDate: string;
    fileUrl: string;
};

// ==================== Upload Certification ====================

const uploadCertification = async (data: IUploadCertificationRequest, user: TokenPayload): Promise<SustainabilityCert> => {
    const vendor = await prisma.vendorProfile.findUnique({
        where: { userId: user.id },
    });

    if (!vendor) {
        throw new Error('Vendor profile not found!');
    }

    const result = await prisma.sustainabilityCert.create({
        data: {
            ...data,
            certificationDate: new Date(data.certificationDate),
            vendorId: vendor.id,
        },
    });

    return result;
};

// ==================== Get All Certifications ====================
const getAllCertifications = async () => {
    const result = await prisma.sustainabilityCert.findMany({
        include: { vendor: true },
    });
    return result;
};

// ==================== Validate Certification ====================
const validateCertification = async (id: string, data: { status: CertificationStatus }) => {
    const result = await prisma.sustainabilityCert.update({
        where: { id },
        data: { status: data.status },
    });

    if (data.status === CertificationStatus.APPROVED) {
        await prisma.vendorProfile.update({
            where: { id: result.vendorId },
            data: { certificationStatus: CertificationStatus.APPROVED },
        });
    }

    return result;
};

// ==================== Export Service ====================

export const SustainabilityService = {
    uploadCertification,
    getAllCertifications,
    validateCertification,
};
