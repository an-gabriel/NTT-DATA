import express from 'express';

import getAll from '@/modules/Farmer/routes/GET/All';

const AllRoutes = express.Router();

AllRoutes.use('/farmers', getAll);

export default AllRoutes;
