import { PrismaClient } from '@prisma/client';

import { FarmerCreateInput, FarmerQueryParams, FarmerGetAll, FarmerUpdateInput } from '@/modules/Farmer/interfaces'

class FarmerService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllFarmers(): Promise<FarmerGetAll[]> {
        return this.prisma.farmer.findMany();
    }

    async getFarmersByQuery(queryParams: FarmerQueryParams) {
        const where: Record<string, any> = Object.fromEntries(
            Object.entries(queryParams).filter(([_, value]) => value !== undefined)
        );

        return this.prisma.farmer.findMany({
            where,
        });
    }

    async createFarmer(data: FarmerCreateInput) {
        return this.prisma.farmer.create({
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

        return this.prisma.farmer.update({
            where: { id },
            data,
        });
    }
}

export default new FarmerService();
