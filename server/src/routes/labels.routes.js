import { Router } from 'express';
import { getLabels, saveLabel, updateLabel, deleteLabel } from '../controllers/labels.controllers.js';

const router = Router();

router
  .get('/', getLabels)
  .post('/', saveLabel)
  .put('/:name', updateLabel)
  .delete('/:name', deleteLabel);

export default router;