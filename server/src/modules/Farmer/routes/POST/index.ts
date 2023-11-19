import express, { NextFunction, Request, Response, Router } from 'express';

import ValidationMiddleware from '@/Middleware/ValidateSchema'

import FarmerControllers from '@/modules/Farmer/controllers/Farmer.controllers';
import { FarmerSchema } from '@/modules/Farmer/schemas/FarmerSchema';

/**
 * @swagger
 * /api/v1/farmers:
 *   get:
 *     // ... (existing GET route details)
 *   post:
 *     summary: Cria um novo agricultor
 *     tags: [Farmers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documentType:
 *                 type: string
 *               documentNumber:
 *                 type: string
 *               name:
 *                 type: string
 *               farmName:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               totalAreaHectares:
 *                 type: number
 *               arableAreaHectares:
 *                 type: number
 *               vegetationAreaHectares:
 *                 type: number
 *     responses:
 *       201:
 *         description: Agricultor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farmer'
 *       400:
 *         description: Dados inválidos do agricultor
 *       500:
 *         description: Erro interno do servidor
 */
class FarmersRouter {
    public router: Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private async createFarmer(req: Request, res: Response): Promise<void> {
        try {
            const farmerData = req.body;
            const createdFarmer = await FarmerControllers.createFarmer(farmerData);
            res.status(201).json(createdFarmer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    private initializeRoutes(): void {
        this.router.post('/', ValidationMiddleware.validateSchema(FarmerSchema), this.createFarmer.bind(this));
    }
}

const farmersRouter = new FarmersRouter();

export default farmersRouter.router;
