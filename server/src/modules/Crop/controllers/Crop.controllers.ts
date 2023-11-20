import CropService from '@/modules/Crop/service/Crop.service';
import {
    CropGetAll,
    CropUpdateInput,
    CropCreateInput,
    CropQueryParams,
} from '@/modules/Crop/interfaces';

class CropController {
    async getAllCrops(): Promise<CropGetAll[] | Error> {
        try {
            const crops = await CropService.getAllCrops();
            return crops;
        } catch (error) {
            throw new Error("Internal server error");
        }
    }

    async getCropsByFilters(filters: Partial<CropQueryParams>): Promise<CropGetAll[] | Error> {
        try {
            const crops = await CropService.getCropsByFilters(filters);
            return crops;
        } catch (error) {
            throw new Error("Internal server error");
        }
    }

    async createCrop(cropData: CropCreateInput): Promise<CropCreateInput | Error> {
        try {
            const createdCrop = await CropService.createCrop(cropData);
            return createdCrop;
        } catch (error) {
            throw new Error("Internal server error");
        }
    }

    async updateCrop(id: string, cropData: Partial<CropUpdateInput>): Promise<CropUpdateInput | null | Error> {
        try {
            const updatedCrop = await CropService.updateCrop(id, cropData);
            return updatedCrop;
        } catch (error) {
            throw new Error('Internal server error');
        }
    }

    async deleteCrop(id: string): Promise<void | null> {
        try {
            await CropService.deleteCrop(id);
        } catch (error) {
            throw new Error('Internal server error');
        }
    }
}

export default new CropController();
