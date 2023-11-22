import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

class ValidationMiddleware {
    validateSchema(schema: z.ZodSchema<any>) {
        return (req: Request, res: Response, next: NextFunction): void => {
            const data = req.body;

            const validationResult = schema.safeParse(data);

            if (validationResult.success) {
                next();
            } else {
                res.status(400).json({ error: validationResult.error });
            }
        };
    }
}

export default new ValidationMiddleware();
