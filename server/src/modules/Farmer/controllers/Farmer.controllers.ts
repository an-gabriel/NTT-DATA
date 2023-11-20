import FarmerService from '@/modules/Farmer/service/Farmer.service';
import {
    FarmerGetAll,
    FarmerUpdateInput,
    FarmerCreateInput,
    FarmerQueryParams
} from '@/modules/Farmer/interfaces';

class FarmerController {
    async getAllFarmers(): Promise<FarmerGetAll[] | Error> {
        try {
            const farmers = await FarmerService.getAllFarmers();
            return farmers
        } catch (error) {
            throw new Error("Internal server error");
        }
    }

    async getFarmersByFilters(filters: Partial<FarmerQueryParams>): Promise<FarmerGetAll[] | Error> {
        try {
            const filtersSanitezed = this.sanitizeFarmerQueryParams(filters)
            const farmers = await FarmerService.getFarmersByFilters(filtersSanitezed);
            return farmers;
        } catch (error) {
            throw new Error("Internal server error");
        }
    }

    async createFarmer(farmerData: FarmerCreateInput): Promise<FarmerCreateInput | Error> {
        try {
            const createdFarmer = await FarmerService.createFarmer(farmerData);
            return createdFarmer
        } catch (error) {
            throw new Error("Internal server error");
        }
    }

    async updateFarmer(id: string, farmerData: Partial<FarmerUpdateInput>): Promise<FarmerUpdateInput | null | Error> {
        try {
            const updatedFarmer = await FarmerService.updateFarmer(id, farmerData);
            return updatedFarmer;
        } catch (error) {
            throw new Error('Internal server error');
        }
    }

    async deleteFarmer(id: string): Promise<void | null> {
        try {
            await FarmerService.deleteFarmer(id);
        } catch (error) {
            throw new Error('Internal server error');
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
