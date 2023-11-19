import express from 'express';

import getAll from '@/modules/Farmer/routes/GET/All';
import createFarmer from '@/modules/Farmer/routes/POST';

const AllRoutes = express.Router();

AllRoutes.use('/farmers', getAll);
AllRoutes.use('/farmers/create', createFarmer);

export default AllRoutes;
