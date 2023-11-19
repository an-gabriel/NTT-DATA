import FarmerService from '@/modules/Farmer/service/Farmer.service';
import { FarmerCreateInput, FarmerGetAll } from '@/modules/Farmer/interfaces';

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
}

export default new FarmerController();
