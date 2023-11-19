// server/src/modules/crop/seed/cropSeed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    const cropsData = [
        { name: 'Soja' },
        { name: 'Milho' },
        { name: 'Algodão' },
        { name: 'Café' },
        { name: 'Cana de Açúcar' },
    ];

    const existingCrops: string[] = [];
    const insertedCrops: string[] = [];

    for (const crop of cropsData) {
        const existingCrop = await prisma.crop.findUnique({
            where: { name: crop.name },
        });

        if (!existingCrop) {
            await prisma.crop.create({
                data: {
                    name: crop.name,
                },
            });
            insertedCrops.push(crop.name);
        } else {
            existingCrops.push(crop.name);
        }
    }

    console.log('Existing Crops:\n', JSON.stringify(existingCrops, null, 15));
    console.log('Inserted Crops:\n', JSON.stringify(insertedCrops, null, 15));
}

seed()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
