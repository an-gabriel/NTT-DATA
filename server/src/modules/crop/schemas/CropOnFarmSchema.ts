import { z } from 'zod';

import { FarmerSchema } from '@/modules/Farmer/schemas/FarmerSchema';
import { CropSchema } from '@/modules/crop/schemas/CropSchema';

export const CropOnFarmSchema = z.object({
    id: z.string().uuid(),
    farmerId: z.string().uuid(),
    cropId: z.string().uuid(),
    farmer: FarmerSchema,
    crop: CropSchema,
});