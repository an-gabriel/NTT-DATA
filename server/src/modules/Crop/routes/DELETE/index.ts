import express, { Request, Response, Router } from 'express';
import CropController from '@/modules/Crop/controllers/Crop.controllers';

/**
 * @swagger
 * /api/v1/crops/delete/{id}:
 *   delete:
 *     summary: Exclui uma platanção existente
 *     tags: [Crops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID da platanção a ser excluída
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: platanção excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem indicando que a deleção foi realizada com sucesso
 *                   example: platanção excluída com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

class CropsDeleteRouter {
    public router: Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private async deleteCrop(req: Request, res: Response): Promise<void> {
        try {
            const cropId = req.params.id;

            await CropController.deleteCrop(cropId);
            res.status(201).json({ message: 'Crop deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private initializeRoutes(): void {
        this.router.delete('/:id', this.deleteCrop.bind(this));
    }
}

const cropsDeleteRouter = new CropsDeleteRouter();

export default cropsDeleteRouter.router;
