import express from 'express';

import clientsRoutes from './clients';
import workLogsRoutes from './workLogs';
import jobCategoriesRoutes from './categories';

const router = express.Router();

router.use(express.json());

router.use('/clients', clientsRoutes);
router.use('/worklogs', workLogsRoutes);
router.use('/categories', jobCategoriesRoutes);

export default router;
