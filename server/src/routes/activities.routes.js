import { Router } from 'express';
import {
  createActivitie,
  getActivities,
  countActivities,
  getAutoCompleteData,
  deleteActivities
} from '../controllers/activities.controllers.js';

const router = Router();

router
  .post('/', createActivitie)
  .get('/', getActivities)
  .get('/count', countActivities)
  .get('/autocomplete', getAutoCompleteData)
  .delete('/:id', deleteActivities);

export default router;
