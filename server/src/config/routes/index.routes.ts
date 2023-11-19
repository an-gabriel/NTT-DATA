import express from 'express';
import getAll from '@/modules/Farmer/routes/GET/All';
import createFarmer from '@/modules/Farmer/routes/POST';
import updateFarmer from '@/modules/Farmer/routes/PUT';

const AllRoutes = express.Router();

AllRoutes.use('/farmers', getAll);
AllRoutes.use('/farmers/create', createFarmer);
AllRoutes.use('/farmers/update', updateFarmer);


export default AllRoutes;
