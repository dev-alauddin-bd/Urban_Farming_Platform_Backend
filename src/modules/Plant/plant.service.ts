import { Plant } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { TokenPayload } from "../../utils/generateTokens.js";

const createPlant = async (data: Partial<Plant>, user: TokenPayload): Promise<Plant> => {
    const result = await prisma.plant.create({
        data: {
            name: data.name as string,
            species: data.species,
            plantingDate: data.plantingDate ? new Date(data.plantingDate) : new Date(),
            expectedHarvest: data.expectedHarvest ? new Date(data.expectedHarvest) : null,
            userId: user.id,
        },
    });
    return result;
};

const getMyPlants = async (user: TokenPayload) => {
    const result = await prisma.plant.findMany({
        where: {
            userId: user.id,
            isDeleted: false,
        },
    });
    return result;
};

const updatePlantStatus = async (id: string, data: Partial<Plant>) => {
    const result = await prisma.plant.update({
        where: { id },
        data,
    });
    return result;
};

export const PlantService = {
    createPlant,
    getMyPlants,
    updatePlantStatus,
};
