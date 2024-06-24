import { Router } from 'express';

const router = Router();
import activitiesRouter from './activities.routes.js';
import dataTableRouter from './datatable.routes.js';
import labelsRouter from './labels.routes.js';

router.use('/activities', activitiesRouter);
router.use('/datatable', dataTableRouter);
router.use('/labels', labelsRouter);

export default router;
