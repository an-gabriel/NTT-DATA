import { z } from 'zod';

export const FarmerSchema = z.object({
    documentType: z.string(),
    documentNumber: z.string(),
    name: z.string(),
    farmName: z.string(),
    city: z.string(),
    state: z.string(),
    totalAreaHectares: z.number(),
    arableAreaHectares: z.number(),
    vegetationAreaHectares: z.number()
});
