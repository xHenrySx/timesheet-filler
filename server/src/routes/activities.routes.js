import { Router } from 'express';
import {
  createActivitie,
  getActivities,
  countActivities
} from '../controllers/activities.controllers.js';

const router = Router();

router
  .post('/', createActivitie)
  .get('/', getActivities)
  .get('/count', countActivities);

export default router;
