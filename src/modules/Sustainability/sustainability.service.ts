import {
    CertificationStatus,
    SustainabilityCert,
    Prisma,
} from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { TokenPayload } from "../../utils/generateTokens.js";

type IUploadCertificationRequest = {
    certifyingAgency: string;
    certificationDate: string;
    fileUrl: string;
};

// ==================== Upload Certification ====================
const uploadCertification = async (
    data: IUploadCertificationRequest,
    user: TokenPayload
): Promise<SustainabilityCert> => {
    const vendor = await prisma.vendorProfile.findFirst({
        where: {
            userId: user.id,
            isDeleted: false, // ✅ FIX
        },
        select: { id: true },
    });

    if (!vendor) {
        throw new Error("Vendor profile not found!");
    }

    // ✅ safe date parse
    const parsedDate = new Date(data.certificationDate);
    if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid certification date!");
    }

    return prisma.sustainabilityCert.create({
        data: {
            certifyingAgency: data.certifyingAgency,
            certificationDate: parsedDate,
            fileUrl: data.fileUrl,
            vendorId: vendor.id,
        },
    });
};

// ==================== Get All Certifications ====================
const getAllCertifications = async () => {
    return prisma.sustainabilityCert.findMany({
        where: {
            isDeleted: false, // ✅ FIX
        },

        orderBy: {
            createdAt: "desc", // ✅ indexed field use
        },

        select: {
            id: true,
            certifyingAgency: true,
            certificationDate: true,
            fileUrl: true,
            status: true,
            createdAt: true,

            vendor: {
                select: {
                    id: true,
                    farmName: true,
                    farmLocation: true,
                    certificationStatus: true,
                },
            },
        },
    });
};

// ==================== Validate Certification (TRANSACTION FIX) ====================
const validateCertification = async (
    id: string,
    data: { status: CertificationStatus }
) => {
    return prisma.$transaction(async (tx) => {
        const cert = await tx.sustainabilityCert.update({
            where: { id },
            data: {
                status: data.status,
            },
            select: {
                id: true,
                status: true,
                vendorId: true,
            },
        });

        // ✅ sync vendor status
        if (data.status === CertificationStatus.APPROVED) {
            await tx.vendorProfile.update({
                where: { id: cert.vendorId },
                data: {
                    certificationStatus: CertificationStatus.APPROVED,
                },
            });
        }

        return cert;
    });
};

// ==================== Export ====================
export const SustainabilityService = {
    uploadCertification,
    getAllCertifications,
    validateCertification,
};