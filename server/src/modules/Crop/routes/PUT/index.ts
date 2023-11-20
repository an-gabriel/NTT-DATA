import express, { Request, Response, Router } from 'express';
import CropController from '@/modules/Crop/controllers/Crop.controllers';
import ValidationMiddleware from '@/Middleware/ValidateSchema';
import { CropUpdateSchema } from '@/modules/Crop/schemas/CropUpdateSchema';

/**
 * @swagger
 * /api/v1/crops/update/{id}:
 *   put:
 *     summary: Atualiza uma platanção existente
 *     tags: [Crops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID da platanção a ser atualizada
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: false
 *               startDate:
 *                 type: string
 *                 format: date
 *                 required: false
 *               endDate:
 *                 type: string
 *                 format: date
 *                 required: false
 *               active:
 *                 type: boolean
 *                 required: false
 *     responses:
 *       200:
 *         description: platanção atualizada com sucesso
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
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   description: Data de início da platanção
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   description: Data de término da platanção
 *                 active:
 *                   type: boolean
 *                   description: Indica se a platanção está ativa
 *               example:
 *                 id: "ac9e6e3e-8f1b-4fc1-bb63-d4e57f1b3f8f"
 *                 name: "platanção 1"
 *                 startDate: "2023-01-01"
 *                 endDate: "2023-12-31"
 *                 active: true
 *       400:
 *         description: Dados inválidos da platanção
 *       500:
 *         description: Erro interno do servidor
 */
class CropsUpdateRouter {
    public router: Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private async updateCrop(req: Request, res: Response): Promise<void> {
        try {
            const cropId = req.params.id;
            const cropData = req.body;

            const updatedCrop = await CropController.updateCrop(cropId, cropData);
            res.status(200).json(updatedCrop);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    private initializeRoutes(): void {
        this.router
            .put('/:id',
                ValidationMiddleware.validateSchema(CropUpdateSchema),
                this.updateCrop.bind(this)
            );
    }
}

const cropsUpdateRouter = new CropsUpdateRouter();

export default cropsUpdateRouter.router;
