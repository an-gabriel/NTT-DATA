import express, { Request, Response, Router } from 'express';

import ValidationMiddleware from '@/middleware/ValidateSchema'

import FarmerControllers from '@/modules/Farmer/controllers/Farmer.controllers';
import { FarmerCreateSchema } from '@/modules/Farmer/schemas/FarmerCreateSchema';

/**
  * @swagger
  * /api/v1/farmers/create:
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
  *               crops:
  *                 type: array
  *                 items:
  *                   type: string
  *     responses:
  *       201:
  *         description: Agricultor criado com sucesso
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 id:
  *                   type: string
  *                   format: uuid
  *                   description: UUID do agricultor
  *                 documentType:
  *                   type: string
  *                   description: Tipo de documento
  *                 documentNumber:
  *                   type: string
  *                   description: Número do documento
  *                 name:
  *                   type: string
  *                   description: Nome do agricultor
  *                 farmName:
  *                   type: string
  *                   description: Nome da fazenda
  *                 city:
  *                   type: string
  *                   description: Cidade
  *                 state:
  *                   type: string
  *                   description: Estado
  *                 totalAreaHectares:
  *                   type: number
  *                   description: Área total em hectares
  *                 arableAreaHectares:
  *                   type: number
  *                   description: Área cultivável em hectares
  *                 vegetationAreaHectares:
  *                   type: number
  *                   description: Área de vegetação em hectares
  *                 crops:
  *                   type: array
  *                   items:
  *                     type: string
  *                   description: IDs das culturas associadas ao agricultor
  *               example:
  *                 id: "ac9e6e3e-8f1b-4fc1-bb63-d4e57f1b3f8f"
  *                 documentType: "CPF"
  *                 documentNumber: "12345678900"
  *                 name: "Agricultor 1"
  *                 farmName: "Fazenda 1"
  *                 city: "Cidade 1"
  *                 state: "Estado 1"
  *                 totalAreaHectares: 100
  *                 arableAreaHectares: 50
  *                 vegetationAreaHectares: 50
  *                 crops: ["cropId1", "cropId2"]
  *       400:
  *         description: Dados inválidos do agricultor
  *       500:
  *         description: Erro interno do servidor
  */

class FarmersCreate {
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
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private initializeRoutes(): void {
        this.router.post('/', ValidationMiddleware.validateSchema(FarmerCreateSchema), this.createFarmer.bind(this));
    }
}

const farmersCreateRouter = new FarmersCreate();

export default farmersCreateRouter.router;
