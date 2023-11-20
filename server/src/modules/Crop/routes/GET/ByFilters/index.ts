import express, { Request, Response, Router } from 'express';
import CropController from '@/modules/Crop/controllers/Crop.controllers';
import ValidationMiddleware from '@/Middleware/ValidateSchema';
import { CropQueryParams } from '@/modules/Crop/interfaces';
import { CropQueryParamsSchema } from '@/modules/Crop/schemas/CropQueryParamsSchema';

/**
 * @swagger
 * /api/v1/crops/filters:
 *   get:
 *     summary: Retorna platanção com base em filtros
 *     tags: [Crops]
 *     parameters:
 *       - in: query
 *         name: name
 *         description: Nome da platanção
 *         schema:
 *           type: string
 *       - in: query
 *         name: active
 *         description: Indica se a platanção está ativa
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Lista de platanção filtrada
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
 *                     description: UUID da platanção
 *                   name:
 *                     type: string
 *                     description: Nome da platanção
 *                   active:
 *                     type: boolean
 *                     description: Indica se a platanção está ativa
 *               example:
 *                 - id: "ac9e6e3e-8f1b-4fc1-bb63-d4e57f1b3f8f"
 *                   name: "platanção 1"
 *                   active: true
 *                 - id: "ecdf25d2-5eab-4a6a-9b18-4c0380d602f1"
 *                   name: "platanção 2"
 *                   active: false
 *       500:
 *         description: Erro interno do servidor
 */
class CropsByFiltersRouter {
    public router: Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private async getCropsByFilters(req: Request, res: Response): Promise<void> {
        try {
            const filters: CropQueryParams = req.query;
            const crops = await CropController.getCropsByFilters(filters);
            res.status(200).json(crops);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private initializeRoutes(): void {
        this.router.get(
            '/',
            ValidationMiddleware.validateSchema(CropQueryParamsSchema),
            this.getCropsByFilters.bind(this)
        );
    }
}

const cropsByFiltersRouter = new CropsByFiltersRouter();

export default cropsByFiltersRouter.router;
