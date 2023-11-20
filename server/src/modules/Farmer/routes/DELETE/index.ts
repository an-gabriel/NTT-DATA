import express, { Request, Response, Router } from 'express';
import FarmerControllers from '@/modules/Farmer/controllers/Farmer.controllers';


/**
 * @swagger
 * /api/v1/farmers/delete/{id}:
 *   delete:
 *     summary: Exclui um agricultor existente
 *     tags: [Farmers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID do agricultor a ser excluído
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Agricultor excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem indicando que a deleção foi realizada com sucesso
 *                   example: Agricultor excluído com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

class FarmersDeleteRouter {
    public router: Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private async deleteFarmer(req: Request, res: Response): Promise<void> {
        try {
            const farmerId = req.params.id;

            await FarmerControllers.deleteFarmer(farmerId);
            res.status(201).json({ message: 'Farmer deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }


    private initializeRoutes(): void {
        this.router.delete('/:id', this.deleteFarmer.bind(this));
    }
}

const farmersDeleteRouter = new FarmersDeleteRouter();

export default farmersDeleteRouter.router;
