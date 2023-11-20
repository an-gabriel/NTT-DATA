import { PrismaClient } from '@prisma/client';

import { FarmerCreateInput, FarmerQueryParams, FarmerGetAll, FarmerUpdateInput } from '@/modules/Farmer/interfaces'

class FarmerService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllFarmers(): Promise<FarmerGetAll[]> {
        try {
            return await this.prisma.farmer.findMany({
                where: {
                    active: true,
                    deletedAt: null,
                },
            });
        } catch (error) {
            throw new Error('A problem occurred while using getAllFarmers')
        }

    }

    async getFarmersByFilters(queryParams: Partial<FarmerQueryParams>): Promise<FarmerGetAll[]> {
        try {
            const where: Record<string, any> = Object.fromEntries(
                Object.entries(queryParams).filter(([_, value]) => value !== undefined)
            );

            return await this.prisma.farmer.findMany({
                where,
            });
        } catch (error) {
            throw new Error('A problem occurred while using getFarmersByFilters')
        }
    }

    async createFarmer(data: FarmerCreateInput): Promise<FarmerCreateInput> {
        const existingFarmer = await this.prisma.farmer.findFirst({
            where: {
                OR: [
                    { documentNumber: data.documentNumber },
                    { name: data.name },
                    { farmName: data.farmName },
                ],
            },
        });

        if (existingFarmer) {
            throw new Error('A farmer with the same documentNumber, name, or farmName already exists.');
        }

        try {
            const createCrop = await this.prisma.farmer.create({
                data,
            });

            return createCrop;
        } catch (error) {
            throw new Error('A problem occurred while using getFarmersByFilters')
        }
    }


    async updateFarmer(id: string, data: FarmerUpdateInput): Promise<FarmerGetAll | null> {
        const existingFarmer = await this.prisma.farmer.findUnique({
            where: { id },
        });

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
        const existingFarmer = await this.prisma.farmer.findUnique({
            where: { id },
        });

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
}

export default new FarmerService();
