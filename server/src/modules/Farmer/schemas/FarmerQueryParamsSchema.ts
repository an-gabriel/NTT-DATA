import { z } from 'zod';

export const FarmerQueryParamsSchema = z.object({
    name: z.string().optional(),
    documentType: z.string().optional(),
    documentNumber: z.string().optional(),
    farmName: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    active: z.boolean().optional(),
});
