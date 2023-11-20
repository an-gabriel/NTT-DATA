import express, { Request, Response, Router } from 'express';
import CropController from '@/modules/Crop/controllers/Crop.controllers';

/**
 * @swagger
 * /api/v1/crops:
 *   get:
 *     summary: Retorna todas as platanções
 *     tags: [Crops]
 *     responses:
 *       200:
 *         description: Lista de platanções
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     description: UUID
 *                   name:
 *                     type: string
 *                     description: Nome
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     description: Data de início
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     description: Data de término
 *                   active:
 *                     type: boolean
 *                     description: Indica se a platanção está ativa
 *               example:
 *                 - id: "ac9e6e3e-8f1b-4fc1-bb63-d4e57f1b3f8f"
 *                   name: "platanção 1"
 *                   startDate: "2023-01-01"
 *                   endDate: "2023-12-31"
 *                   active: true
 *                 - id: "ecdf25d2-5eab-4a6a-9b18-4c0380d602f1"
 *                   name: "platanção 2"
 *                   startDate: "2023-02-01"
 *                   endDate: "2023-11-30"
 *                   active: false
 *       500:
 *         description: Erro interno do servidor
 */
class GetAllCropsRouter {
    public router: Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private async getAllCrops(req: Request, res: Response): Promise<void> {
        try {
            const crops = await CropController.getAllCrops();
            res.status(200).json(crops);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    private initializeRoutes(): void {
        this.router.get('/', this.getAllCrops.bind(this));
    }
}

const getAllCropsRouter = new GetAllCropsRouter();

export default getAllCropsRouter.router;
