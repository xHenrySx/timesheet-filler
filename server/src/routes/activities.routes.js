import { Router } from 'express';
import {
  createActivitie,
  getActivities,
  countActivities,
  getAutoCompleteData,
  deleteActivities,
  updateActivitie
} from '../controllers/activities.controllers.js';

const router = Router();

router
  .post('/', createActivitie)
  .get('/', getActivities)
  .get('/count', countActivities)
  .get('/autocomplete', getAutoCompleteData)
  .delete('/:id', deleteActivities)
  .put('/:id', updateActivitie);

export default router;
