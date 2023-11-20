import { PrismaClient } from '@prisma/client';

import { CropCreateInput, CropQueryParams, CropGetAll, CropUpdateInput } from '@/modules/Crop/interfaces';

class CropService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllCrops(): Promise<CropGetAll[]> {
        return await this.prisma.crop.findMany({
            where: {
                active: true,
                deletedAt: null,
            },
        });
    }

    async getCropsByFilters(queryParams: Partial<CropQueryParams>): Promise<CropGetAll[]> {
        const where: Record<string, any> = Object.fromEntries(
            Object.entries(queryParams).filter(([_, value]) => value !== undefined)
        );

        return await this.prisma.crop.findMany({
            where,
        });
    }

    async createCrop(data: CropCreateInput): Promise<CropGetAll> {
        return await this.prisma.crop.create({
            data,
        });
    }

    async updateCrop(id: string, data: CropUpdateInput): Promise<CropGetAll | null> {
        const existingCrop = await this.prisma.crop.findUnique({
            where: { id },
        });

        if (!existingCrop) {
            throw new Error(`Crop with ID ${id} not found.`);
        }

        return await this.prisma.crop.update({
            where: { id },
            data,
        });
    }

    async deleteCrop(id: string): Promise<CropGetAll | null> {
        const existingCrop = await this.prisma.crop.findUnique({
            where: { id },
        });

        if (!existingCrop) {
            throw new Error(`Crop with ID ${id} not found.`);
        }

        return await this.prisma.crop.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                active: false,
            },
        });
    }
}

export default new CropService();
