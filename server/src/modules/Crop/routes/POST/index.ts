import express, { Request, Response, Router } from 'express';
import CropController from '@/modules/Crop/controllers/Crop.controllers';
import ValidationMiddleware from '@/Middleware/ValidateSchema';
import { CropCreateSchema } from '@/modules/Crop/schemas/CropCreateSchema';

/**
 * @swagger
 * /api/v1/crops/create:
 *   post:
 *     summary: Cria uma nova platanção
 *     tags: [Crops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: platanção criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   description: UUID da platanção
 *                 name:
 *                   type: string
 *                   description: Nome da platanção
 *               example:
 *                 id: "ac9e6e3e-8f1b-4fc1-bb63-d4e57f1b3f8f"
 *                 name: "platanção 1"
 *                 active: true
 *       400:
 *         description: Dados inválidos da platanção
 *       500:
 *         description: Erro interno do servidor
 */
class CropsCreateRouter {
    public router: Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private async createCrop(req: Request, res: Response): Promise<void> {
        try {
            const cropData = req.body;
            const createdCrop = await CropController.createCrop(cropData);
            res.status(201).json(createdCrop);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private initializeRoutes(): void {
        this.router.post('/', ValidationMiddleware.validateSchema(CropCreateSchema), this.createCrop.bind(this));
    }
}

const cropsCreateRouter = new CropsCreateRouter();

export default cropsCreateRouter.router;
