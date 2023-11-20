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
            throw new Error((error as Error).message)
        }
    }

    async getCropsByFilters(filters: Partial<CropQueryParams>): Promise<CropGetAll[] | Error> {
        try {
            const filtersSanitezed = this.sanitizeCropQueryParams(filters);
            const crops = await CropService.getCropsByFilters(filtersSanitezed);
            return crops;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    async createCrop(cropData: CropCreateInput): Promise<CropCreateInput | Error> {
        try {
            const createdCrop = await CropService.createCrop(cropData);
            return createdCrop;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    async updateCrop(id: string, cropData: Partial<CropUpdateInput>): Promise<CropUpdateInput | null | Error> {
        try {
            const updatedCrop = await CropService.updateCrop(id, cropData);
            return updatedCrop;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    async deleteCrop(id: string): Promise<void | null> {
        try {
            await CropService.deleteCrop(id);
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    private sanitizeCropQueryParams(data: Partial<CropQueryParams>): CropQueryParams {
        const sanitize: Partial<CropQueryParams> = {};

        if (data.active) {
            sanitize.active = typeof data.active === 'string'
                ? String(data.active).toLowerCase() === 'true'
                : Boolean(data.active);
        }

        if (data.name) {
            sanitize.name = data.name;
        }

        return sanitize as CropQueryParams;
    }


}

export default new CropController();
