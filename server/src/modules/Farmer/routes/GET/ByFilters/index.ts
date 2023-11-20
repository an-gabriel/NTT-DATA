import express, { Request, Response, Router } from 'express';
import FarmerControllers from '@/modules/Farmer/controllers/Farmer.controllers';
import ValidationMiddleware from '@/Middleware/ValidateSchema';
import { FarmerQueryParamsSchema } from '@/modules/Farmer/schemas/FarmerQueryParamsSchema';
import { FarmerQueryParams } from '@/modules/Farmer/interfaces';

/**
 * @swagger
 * /api/v1/farmers/filters:
 *   get:
 *     summary: Retorna agricultores com base em filtros
 *     tags: [Farmers]
 *     parameters:
 *       - in: query
 *         name: documentType
 *         description: Tipo de documento
 *         schema:
 *           type: string
 *       - in: query
 *         name: documentNumber
 *         description: Número do documento
 *         schema:
 *           type: string
 *       - in: query
 *         name: name
 *         description: Nome do agricultor
 *         schema:
 *           type: string
 *       - in: query
 *         name: farmName
 *         description: Nome da fazenda
 *         schema:
 *           type: string
 *       - in: query
 *         name: city
 *         description: Cidade
 *         schema:
 *           type: string
 *       - in: query
 *         name: state
 *         description: Estado
 *         schema:
 *           type: string
 *       - in: query
 *         name: active
 *         description: Indica se o agricultor está ativo
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Lista de agricultores filtrada
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
 *                     description: UUID do agricultor
 *                   documentType:
 *                     type: string
 *                     description: Tipo de documento
 *                   documentNumber:
 *                     type: string
 *                     description: Número do documento
 *                   name:
 *                     type: string
 *                     description: Nome do agricultor
 *                   farmName:
 *                     type: string
 *                     description: Nome da fazenda
 *                   city:
 *                     type: string
 *                     description: Cidade
 *                   state:
 *                     type: string
 *                     description: Estado
 *                   totalAreaHectares:
 *                     type: number
 *                     description: Área total em hectares
 *                   arableAreaHectares:
 *                     type: number
 *                     description: Área cultivável em hectares
 *                   vegetationAreaHectares:
 *                     type: number
 *                     description: Área de vegetação em hectares
 *               example:
 *                 - id: "ac9e6e3e-8f1b-4fc1-bb63-d4e57f1b3f8f"
 *                   documentType: "CPF"
 *                   documentNumber: "12345678900"
 *                   name: "Agricultor 1"
 *                   farmName: "Fazenda 1"
 *                   city: "Cidade 1"
 *                   state: "Estado 1"
 *                   totalAreaHectares: 100
 *                   arableAreaHectares: 50
 *                   vegetationAreaHectares: 50
 *                 - id: "ecdf25d2-5eab-4a6a-9b18-4c0380d602f1"
 *                   documentType: "CNPJ"
 *                   documentNumber: "9876543210001"
 *                   name: "Agricultor 2"
 *                   farmName: "Fazenda 2"
 *                   city: "Cidade 2"
 *                   state: "Estado 2"
 *                   totalAreaHectares: 150
 *                   arableAreaHectares: 80
 *                   vegetationAreaHectares: 70
 *       500:
 *         description: Erro interno do servidor
 */
class FarmersByFiltersRouter {
    public router: Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private async getFarmersByFilters(req: Request, res: Response): Promise<void> {
        try {
            const filters: FarmerQueryParams = req.query;
            const farmers = await FarmerControllers.getFarmersByFilters(filters);
            res.status(200).json(farmers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private initializeRoutes(): void {
        this.router.get(
            '/',
            ValidationMiddleware.validateSchema(FarmerQueryParamsSchema),
            this.getFarmersByFilters.bind(this)
        );
    }
}

const farmersByFiltersRouter = new FarmersByFiltersRouter();

export default farmersByFiltersRouter.router;
