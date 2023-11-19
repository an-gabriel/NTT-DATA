-- CreateTable
CREATE TABLE "Crop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Crop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farmer" (
    "id" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalAreaHectares" DOUBLE PRECISION NOT NULL,
    "arableAreaHectares" DOUBLE PRECISION NOT NULL,
    "vegetationAreaHectares" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropOnFarm" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "cropId" TEXT NOT NULL,

    CONSTRAINT "CropOnFarm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CropOnFarm" ADD CONSTRAINT "CropOnFarm_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropOnFarm" ADD CONSTRAINT "CropOnFarm_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
