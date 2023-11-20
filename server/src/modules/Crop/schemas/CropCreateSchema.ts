import { z } from 'zod';

export const CropCreateSchema = z.object({
    name: z.string(),
});
