import express from 'express';
import cors from 'cors';

import apiRoutes from './api/index';

const router = express.Router();

router.use(cors());
router.use('/api', apiRoutes);

export default router;
