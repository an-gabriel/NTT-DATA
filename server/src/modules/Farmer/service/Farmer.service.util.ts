import { PrismaClient } from '@prisma/client';
import {
    FarmerCreateRequest,
    FarmerCreateDatabase,
    FarmerQueryParams,
} from '../interfaces';
import { CropData } from '@/modules/Crop/interfaces/CrosData';

export class FarmerServiceUtils {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async getFarmerById(id: string): Promise<FarmerCreateDatabase | null> {
        return await this.prisma.farmer.findUnique({
            where: { id },
            include: this.includeCropsData(),
        }) as FarmerCreateDatabase | null;
    }

    async checkIfFarmerExists(data: Omit<FarmerCreateRequest, "crops">): Promise<FarmerCreateDatabase | null> {
        const { documentNumber, name, farmName } = data;
        return await this.prisma.farmer.findFirst({
            where: {
                OR: [
                    { documentNumber },
                    { name },
                    { farmName },
                ],
            },
        }) as FarmerCreateDatabase | null;
    }

    async createCropsForFarmer(farmerId: string, crops: string[], callback: Function): Promise<void> {
        await Promise.all(crops.map(async crop => {
            await callback(farmerId, crop);
        }));
    }

    async getFarmerWithCropsById(farmerId: string): Promise<FarmerCreateDatabase> {
        const createdFarmer = await this.getFarmerById(farmerId);

        if (!createdFarmer) {
            throw new Error(`Farmer with ID ${farmerId} not found.`);
        }

        return createdFarmer;
    }

    mapFarmersWithCrops(farmers: FarmerCreateDatabase[]): FarmerCreateDatabase[] {
        return farmers.map(farmer => {
            const cropsData = this.mapCropsData(farmer.crops);
            return { ...farmer, crops: cropsData };
        });
    }

    private mapCropsData(crops: FarmerCreateDatabase['crops']): CropData[] {
        return crops?.map(crop => ({
            id: crop.crop.id,
            name: crop.crop.name
        })) || [];
    }

    includeCropsData() {
        return {
            crops: {
                include: {
                    crop: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        };
    }

    buildWhereClause(queryParams: Partial<FarmerQueryParams>): Record<string, any> {
        return Object.fromEntries(
            Object.entries(queryParams).filter(([_, value]) => value !== undefined)
        );
    }
}
