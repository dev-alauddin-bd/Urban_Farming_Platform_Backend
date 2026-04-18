import { Plant, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { TokenPayload } from "../../utils/generateTokens.js";

// ================= CREATE PLANT =================
const createPlant = async (
    data: Partial<Plant>,
    user: TokenPayload
): Promise<Plant> => {
    if (!data.name) {
        throw new Error("Plant name is required!");
    }

    return prisma.plant.create({
        data: {
            name: data.name,
            species: data.species ?? null,
            plantingDate: data.plantingDate
                ? new Date(data.plantingDate)
                : new Date(),
            expectedHarvest: data.expectedHarvest
                ? new Date(data.expectedHarvest)
                : null,
            userId: user.id,
        },
    });
};

// ================= GET MY PLANTS =================
const getMyPlants = async (user: TokenPayload) => {
    return prisma.plant.findMany({
        where: {
            userId: user.id,
            isDeleted: false, // soft delete fix
        },

        orderBy: {
            createdAt: "desc", // performance + consistency
        },

        select: {
            id: true,
            name: true,
            species: true,
            plantingDate: true,
            expectedHarvest: true,
            status: true,
            healthStatus: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

// ================= UPDATE PLANT =================
const updatePlantStatus = async (
    id: string,
    data: Partial<Plant>
): Promise<Plant> => {
    const plant = await prisma.plant.findFirst({
        where: {
            id,
            isDeleted: false,
        },
    });

    if (!plant) {
        throw new Error("Plant not found!");
    }

    // ❌ prevent dangerous updates
    const { id: _id, userId, createdAt, updatedAt, ...safeData } =
        data as any;

    return prisma.plant.update({
        where: { id },
        data: safeData,
    });
};

// ================= EXPORT =================
export const PlantService = {
    createPlant,
    getMyPlants,
    updatePlantStatus,
};