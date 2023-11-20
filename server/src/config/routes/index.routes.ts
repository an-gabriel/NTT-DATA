import express from 'express';

import getAllFarmer from '@/modules/Farmer/routes/GET/All';
import createFarmer from '@/modules/Farmer/routes/POST';
import updateFarmer from '@/modules/Farmer/routes/PUT';
import deleteFarmer from '@/modules/Farmer/routes/DELETE';
import getFarmersByFilters from '@/modules/Farmer/routes/GET/ByFilters';

import getAllCrop from '@/modules/Crop/routes/GET/All';
import createCrop from '@/modules/Crop/routes/POST';
import updateCrop from '@/modules/Crop/routes/PUT';
import deleteCrop from '@/modules/Crop/routes/DELETE';
import getCropByFilters from '@/modules/Crop/routes/GET/ByFilters';

const AllRoutes = express.Router();

AllRoutes.use((req, res, next) => {
    console.log(req.url);
    next()
})

AllRoutes.use('/farmers', getAllFarmer);
AllRoutes.use('/farmers/create', createFarmer);
AllRoutes.use('/farmers/update', updateFarmer);
AllRoutes.use('/farmers/delete', deleteFarmer);
AllRoutes.use('/farmers/filters', getFarmersByFilters);

AllRoutes.use('/crops', getAllCrop);
AllRoutes.use('/crops/create', createCrop);
AllRoutes.use('/crops/update', updateCrop);
AllRoutes.use('/crops/delete', deleteCrop);
AllRoutes.use('/crops/filters', getCropByFilters);

export default AllRoutes;
