import { z } from 'zod';

export const FarmerUpdateSchema = z.object({
    name: z.string().optional(),
    farmName: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    totalAreaHectares: z.number().optional(),
    arableAreaHectares: z.number().optional(),
    vegetationAreaHectares: z.number().optional()
});
