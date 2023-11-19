import { Request, Response } from 'express';
import FarmerService from '@/modules/Farmer/service/Farmer.service';
import { FarmerGetAll } from '@/modules/Farmer/interfaces';


class FarmerController {
    async getAllFarmers(req: Request, res: Response): Promise<FarmerGetAll[] | Error> {
        try {
            const farmers = await FarmerService.getAllFarmers();
            return farmers
        } catch (error) {
            throw new Error("Erro interno do servidor");
        }
    }

    async createFarmer(req: Request, res: Response) {
        try {
            const farmerData = req.body;
            const newFarmer = await FarmerService.createFarmer(farmerData);
            res.status(201).json(newFarmer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export default new FarmerController();
