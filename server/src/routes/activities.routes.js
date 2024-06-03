import { Router } from 'express';
import {
  createActivitie,
  getActivities,
} from '../controllers/activities.controllers.js';

const router = Router();

router.post('/', createActivitie).get('/', getActivities);

export default router;
