import { Router } from 'express';

const router = Router();
import activitiesRouter from './activities.routes.js';
import dataTableRouter from './datatable.routes.js';

router.use('/activities', activitiesRouter);
router.use('/datatable', dataTableRouter);

export default router;
