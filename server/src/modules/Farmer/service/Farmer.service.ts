import { PrismaClient } from '@prisma/client';

import { FarmerCreateInput, FarmerQueryParams, FarmerGetAll, FarmerUpdateInput } from '@/modules/Farmer/interfaces'

class FarmerService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllFarmers(): Promise<FarmerGetAll[]> {
        return await this.prisma.farmer.findMany({
            where: {
                active: true,
                deletedAt: null,
            },
        });
    }

    async getFarmersByFilters(queryParams: Partial<FarmerQueryParams>): Promise<FarmerGetAll[]> {
        const where: Record<string, any> = Object.fromEntries(
            Object.entries(queryParams).filter(([_, value]) => value !== undefined)
        );


        return await this.prisma.farmer.findMany({
            where,
        });
    }

    async createFarmer(data: FarmerCreateInput) {
        return await this.prisma.farmer.create({
            data,
        });
    }

    async updateFarmer(id: string, data: FarmerUpdateInput): Promise<FarmerGetAll | null> {
        const existingFarmer = await this.prisma.farmer.findUnique({
            where: { id },
        });

        if (!existingFarmer) {
            throw new Error(`Farmer with ID ${id} not found.`);
        }

        return await this.prisma.farmer.update({
            where: { id },
            data,
        });
    }

    async deleteFarmer(id: string): Promise<FarmerGetAll | null> {
        const existingFarmer = await this.prisma.farmer.findUnique({
            where: { id },
        });

        if (!existingFarmer) {
            throw new Error(`Farmer with ID ${id} not found.`);
        }

        return await this.prisma.farmer.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                active: false,
            },
        });
    }
}

export default new FarmerService();
