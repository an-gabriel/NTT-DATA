import { z } from 'zod';

export const CropSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
});
