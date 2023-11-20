import express from 'express';
import getAll from '@/modules/Farmer/routes/GET/All';
import createFarmer from '@/modules/Farmer/routes/POST';
import updateFarmer from '@/modules/Farmer/routes/PUT';
import deleteFarmer from '@/modules/Farmer/routes/DELETE';
import getFarmersByFilters from '@/modules/Farmer/routes/GET/ByFilters';

const AllRoutes = express.Router();

AllRoutes.use('/farmers', getAll);
AllRoutes.use('/farmers/create', createFarmer);
AllRoutes.use('/farmers/update', updateFarmer);
AllRoutes.use('/farmers/delete', deleteFarmer);
AllRoutes.use('/farmers/filters', getFarmersByFilters);

AllRoutes.use('/crops', getAll);
AllRoutes.use('/crops/create', createFarmer);
AllRoutes.use('/crops/update', updateFarmer);
AllRoutes.use('/crops/delete', deleteFarmer);
AllRoutes.use('/crops/filters', getFarmersByFilters);

export default AllRoutes;
