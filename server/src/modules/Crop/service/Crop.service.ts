import { PrismaClient } from '@prisma/client';

import { CropCreateInput, CropQueryParams, CropGetAll, CropUpdateInput } from '@/modules/Crop/interfaces';

class CropService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllCrops(): Promise<CropGetAll[]> {
        try {
            return await this.prisma.crop.findMany({
                where: {
                    active: true,
                    deletedAt: null,
                },
            });
        } catch (error) {
            throw new Error('A problem occurred while using getAllCrops')
        }
    }

    async getCropsByFilters(queryParams: Partial<CropQueryParams>): Promise<CropGetAll[]> {
        try {
            const where: Record<string, any> = Object.fromEntries(
                Object.entries(queryParams).filter(([_, value]) => value !== undefined)
            );

            return await this.prisma.crop.findMany({
                where,
            });
        } catch (error) {
            throw new Error('A problem occurred while using getCropsByFilters')
        }
    }

    async createCrop(cropData: CropCreateInput): Promise<CropCreateInput | Error> {
        const existingCrop = await this.prisma.crop.findFirst({
            where: { name: cropData.name },
        });

        if (existingCrop) {
            throw new Error('There is already a crop with that name');
        }

        try {
            const createdCrop = await this.prisma.crop.create({
                data: cropData,
            });

            return createdCrop;
        } catch (error) {
            throw new Error('A problem occurred while using createCrop')
        }
    }

    async updateCrop(id: string, data: CropUpdateInput): Promise<CropGetAll | null> {
        const existingCrop = await this.prisma.crop.findUnique({
            where: { id },
        });

        if (!existingCrop) {
            throw new Error(`Crop with ID ${id} not found.`);
        }

        try {
            const updateCrop = await this.prisma.crop.update({
                where: { id },
                data,
            });

            return updateCrop
        } catch (error) {
            throw new Error('A problem occurred while using updateCrop')
        }
    }

    async deleteCrop(id: string): Promise<CropGetAll | null> {
        const existingCrop = await this.prisma.crop.findUnique({
            where: { id },
        });

        if (!existingCrop) {
            throw new Error(`Crop with ID ${id} not found.`);
        }

        try {
            return await this.prisma.crop.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    active: false,
                },
            });
        } catch (error) {
            throw new Error('A problem occurred while using deleteCrop')
        }
    }
}

export default new CropService();
