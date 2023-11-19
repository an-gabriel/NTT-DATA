import FarmerService from '@/modules/Farmer/service/Farmer.service';
import { FarmerCreateInput, FarmerGetAll, FarmerUpdateInput } from '@/modules/Farmer/interfaces';

class FarmerController {
    async getAllFarmers(): Promise<FarmerGetAll[] | Error> {
        try {
            const farmers = await FarmerService.getAllFarmers();
            return farmers
        } catch (error) {
            throw new Error("Erro interno do servidor");
        }
    }

    async createFarmer(farmerData: FarmerCreateInput) {
        try {
            const createdFarmer = await FarmerService.createFarmer(farmerData);
            return createdFarmer
        } catch (error) {
            throw new Error("Erro interno do servidor");
        }
    }

    async updateFarmer(id: string, farmerData: Partial<FarmerUpdateInput>) {
        try {   
            console.log(id, farmerData)
            const updatedFarmer = await FarmerService.updateFarmer(id, farmerData);
            return updatedFarmer;
        } catch (error) {
            throw new Error('Erro interno do servidor');
        }
    }
}

export default new FarmerController();
