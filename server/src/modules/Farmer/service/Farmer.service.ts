import { CropOnFarm, PrismaClient } from '@prisma/client';
import { FarmerCreateRequest, FarmerQueryParams, FarmerGetAll, FarmerUpdateInput, FarmerCreateDatabase } from '@/modules/Farmer/interfaces'

import { FarmerServiceUtils } from '@/modules/Farmer/service/Farmer.service.util';

class FarmerService {
    private prisma: PrismaClient;
    private util: FarmerServiceUtils;

    constructor() {
        this.prisma = new PrismaClient();
        this.util = new FarmerServiceUtils(this.prisma);
    }

    async getAllFarmers(): Promise<FarmerCreateDatabase[]> {
        try {
            const allFarmers = await this.prisma.farmer.findMany({
                where: {
                    active: true,
                    deletedAt: null,
                },
                include: this.util.includeCropsData(),
            }) as FarmerCreateDatabase[];

            return this.util.mapFarmersWithCrops(allFarmers);
        } catch (error) {
            throw new Error('A problem occurred while using getAllFarmers');
        }
    }

    async getFarmersByFilters(queryParams: Partial<FarmerQueryParams>): Promise<FarmerCreateDatabase[]> {
        try {
            const where: Record<string, any> = this.util.buildWhereClause(queryParams);

            const filteredFarmers = await this.prisma.farmer.findMany({
                where,
                include: this.util.includeCropsData(),
            }) as FarmerCreateDatabase[];

            return this.util.mapFarmersWithCrops(filteredFarmers);
        } catch (error) {
            throw new Error('A problem occurred while using getFarmersByFilters');
        }
    }

    async createFarmer(data: Omit<FarmerCreateRequest, "crops">, crops: string[]): Promise<FarmerCreateDatabase[]> {
        const existingFarmer = await this.util.checkIfFarmerExists(data);

        if (existingFarmer) {
            throw new Error('A farmer with the same documentNumber, name, or farmName already exists.');
        }

        try {
            const createFarmer = await this.prisma.farmer.create({ data });

            await this.util.createCropsForFarmer(createFarmer.id, crops, this.createCropOnFarm);

            const createdFarmer = await this.util.getFarmerWithCropsById(createFarmer.id);

            return [createdFarmer];
        } catch (error) {
            throw new Error('A problem occurred while using createFarmer');
        }
    }

    async updateFarmer(id: string, data: FarmerUpdateInput): Promise<FarmerGetAll | null> {
        const existingFarmer = await this.util.getFarmerById(id);

        if (!existingFarmer) {
            throw new Error(`Farmer with ID ${id} not found.`);
        }
        try {
            const updateFarmer = await this.prisma.farmer.update({
                where: { id },
                data,
            });

            return updateFarmer
        } catch (error) {
            throw new Error('A problem occurred while using updateFarmer')
        }
    }

    async deleteFarmer(id: string): Promise<void> {
        const existingFarmer = await this.util.getFarmerById(id);

        if (!existingFarmer) {
            throw new Error(`Farmer with ID ${id} not found.`);
        }

        try {
            await this.prisma.farmer.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    active: false,
                },
            });

            return
        } catch (error) {
            throw new Error('A problem occurred while using deleteFarmer')
        }
    }

    async createCropOnFarm(idFarmer: string, idCrop: string): Promise<any> {
        const existingCropOnFarm = await this.prisma.cropOnFarm.findFirst({
            where: { farmerId: idFarmer, cropId: idCrop },
        });

        if (existingCropOnFarm) {
            throw new Error('A CropOnFarm with the same farmerId and cropId already exists.');
        }

        try {
            const newCropOnFarm = await this.prisma.cropOnFarm.create({
                data: { farmerId: idFarmer, cropId: idCrop },
            });

            return newCropOnFarm;
        } catch (error) {
            throw new Error('A problem occurred while creating CropOnFarm')
        }
    }
}

export default new FarmerService();