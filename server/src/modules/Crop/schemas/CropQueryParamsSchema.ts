import { z } from 'zod';

export const CropQueryParamsSchema = z.object({
    name: z.string(),
});
