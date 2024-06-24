import { Router } from 'express';
import {
  createActivitie,
  getActivities,
  countActivities,
  getAutoCompleteData
} from '../controllers/activities.controllers.js';

const router = Router();

router
  .post('/', createActivitie)
  .get('/', getActivities)
  .get('/count', countActivities)
  .get('/autocomplete', getAutoCompleteData);

export default router;
