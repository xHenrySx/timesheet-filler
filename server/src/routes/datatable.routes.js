import { Router } from 'express';
import { getDataTables } from '../controllers/datatable.controllers.js';

const router = Router();

router.get('/', getDataTables);

export default router;
