import { FarmerServiceUtil, FarmerServiceInstance } from '@/modules/Farmer/service/Farmer.service';
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
            const farmers = await FarmerServiceInstance.getAllFarmers();
            return farmers
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    async getFarmersByFilters(filters: Partial<FarmerQueryParams>): Promise<FarmerGetAll[] | Error> {
        try {
            const filtersSanitezed = this.sanitizeFarmerQueryParams(filters)
            const farmers = await FarmerServiceInstance.getFarmersByFilters(filtersSanitezed);
            return farmers;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    async createFarmer(farmerData: FarmerCreateRequest): Promise<FarmerCreateDatabase[]> {
        try {
            const { crops, ...rest } = farmerData;

            if (rest.arableAreaHectares + rest.vegetationAreaHectares > rest.totalAreaHectares) {
                throw new Error('The sum of arable and vegetation area cannot be greater than the total area of the farm.');
            }

            const createdFarmer = await FarmerServiceInstance.createFarmer(rest, crops);

            return createdFarmer;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async updateFarmer(id: string, farmerData: Partial<FarmerUpdateInput>): Promise<FarmerUpdateInput | null | Error> {
        try {
            const existingFarmer = await FarmerServiceUtil.getFarmerById(id);

            if (!existingFarmer) {
                throw new Error(`Fazendeiro com ID ${id} não encontrado.`);
            }


            const proposedArableArea = farmerData.arableAreaHectares
                ?? existingFarmer.arableAreaHectares;
            const proposedVegetationArea = farmerData.vegetationAreaHectares
                ?? existingFarmer.vegetationAreaHectares;

            const proposedTotalArea = proposedArableArea + proposedVegetationArea;

            if (proposedTotalArea > (farmerData.totalAreaHectares ?? existingFarmer.totalAreaHectares)) {
                throw new Error('The sum of arable and vegetation area cannot be greater than the total area of the farm.');
            }

            const updatedFarmer = await FarmerServiceInstance.updateFarmer(id, farmerData);

            return updatedFarmer;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async deleteFarmer(id: string): Promise<void | null> {
        try {
            await FarmerServiceInstance.deleteFarmer(id);
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
