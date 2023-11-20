import { z } from 'zod';

export const CropUpdateSchema = z.object({
    name: z.string().optional(),
    active: z.boolean().optional(),
});
