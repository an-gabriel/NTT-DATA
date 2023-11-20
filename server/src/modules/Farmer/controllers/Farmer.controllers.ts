import FarmerService from '@/modules/Farmer/service/Farmer.service';
import {
    FarmerGetAll,
    FarmerUpdateInput,
    FarmerQueryParams,
    FarmerCreateRequest,
    FarmerCreateDatabase
} from '@/modules/Farmer/interfaces';

class FarmerController {
    async getAllFarmers(): Promise<FarmerGetAll[] | Error> {
        try {
            const farmers = await FarmerService.getAllFarmers();
            return farmers
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    async getFarmersByFilters(filters: Partial<FarmerQueryParams>): Promise<FarmerGetAll[] | Error> {
        try {
            const filtersSanitezed = this.sanitizeFarmerQueryParams(filters)
            const farmers = await FarmerService.getFarmersByFilters(filtersSanitezed);
            return farmers;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    async createFarmer(farmerData: FarmerCreateRequest): Promise<FarmerCreateDatabase[]> {
        try {
            const { crops, ...rest } = farmerData;

            const createdFarmer = await FarmerService.createFarmer(rest, crops);

            return createdFarmer;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async updateFarmer(id: string, farmerData: Partial<FarmerUpdateInput>): Promise<FarmerUpdateInput | null | Error> {
        try {
            const updatedFarmer = await FarmerService.updateFarmer(id, farmerData);
            return updatedFarmer;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    async deleteFarmer(id: string): Promise<void | null> {
        try {
            await FarmerService.deleteFarmer(id);
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }


    private sanitizeFarmerQueryParams(data: FarmerQueryParams): FarmerQueryParams {
        const activeSanitezed = typeof data.active === 'string'
            ? String(data.active).toLowerCase() === 'true'
            : Boolean(data.active)

        return {
            name: data.name,
            documentType: data.documentType,
            documentNumber: data.documentNumber,
            farmName: data.farmName,
            city: data.city,
            state: data.state,
            active: activeSanitezed
        }
    }
}

export default new FarmerController();
