import express, { Request, Response, Router } from 'express';
import ValidationMiddleware from '@/Middleware/ValidateSchema';
import FarmerControllers from '@/modules/Farmer/controllers/Farmer.controllers';
import { FarmerUpdateSchema } from '@/modules/Farmer/schemas/FarmerUpdateSchema';

/**
 * @swagger
 * /api/v1/farmers/update/{id}:
 *   put:
 *     summary: Atualiza um agricultor existente
 *     tags: [Farmers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID do agricultor a ser atualizado
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
 *               farmName:
 *                 type: string
 *                 required: false
 *               city:
 *                 type: string
 *                 required: false
 *               state:
 *                 type: string
 *                 required: false
 *               totalAreaHectares:
 *                 type: number
 *                 required: false
 *               arableAreaHectares:
 *                 type: number
 *                 required: false
 *               vegetationAreaHectares:
 *                 type: number
 *                 required: false
 *     responses:
 *       200:
 *         description: Agricultor atualizado com sucesso
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
 *       400:
 *         description: Dados inválidos do agricultor
 *       500:
 *         description: Erro interno do servidor
 */

class FarmersUpdateRouter {
    public router: Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private async updateFarmer(req: Request, res: Response): Promise<void> {
        try {
            const farmerId = req.params.id;
            const farmerData = req.body;

            const updatedFarmer = await FarmerControllers.updateFarmer(farmerId, farmerData);
            res.status(200).json(updatedFarmer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    private initializeRoutes(): void {
        this.router
            .put('/:id',
                ValidationMiddleware.validateSchema(FarmerUpdateSchema),
                this.updateFarmer.bind(this)
            );
    }
}

const farmersUpdateRouter = new FarmersUpdateRouter();

export default farmersUpdateRouter.router;
