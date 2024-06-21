import Activitie from '../database/models/activities.model.js';
import { filterToWhere } from '../utils/database.js';

/**
 * @param {Request} req - Objeto de solicitud
 * @param {Response} res - Objeto de respuesta
 * @returns {Promise<Response>}
 */
export const createActivitie = async ({ body }, res) => {
  const { date, description, duration, jiraTicket, jiraClientTicket } = body;

  if (!date || !description || !duration) {
    return res
      .status(400)
      .json({ message: 'Por Favor complete todos los campos' });
  }

  const newActivitie = new Activitie({
    date,
    description,
    duration,
    jiraTicket,
    jiraClientTicket,
  });

  await newActivitie.save();
  return res.status(200).json({ message: 'Activitie created' });
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getActivities = async (req, res) => {
  const { first, rows, page, sortField, sortOrder, filters } = req?.query ?? {};
  const filter = JSON.parse(filters) || {};
  const limit = parseInt(rows, 10) || 5;
  const offset = (parseInt(page, 10) || 1 - 1) * limit;
  let validSortOrder = 'ASC';
  if (sortOrder === '1') {
    validSortOrder = 'ASC';
  }
  if (sortOrder === '-1') {
    validSortOrder = 'DESC';
  }
  const order = sortField !== 'null' ? [[sortField, validSortOrder]] : [];

  let query = {};
  const where = filterToWhere(filter);
  if (filter) {
    query = {
      where,
      limit,
      offset,
      order,

    };
  }
  console.log(query);
  const activities = await Activitie.findAll(query);

  return res.status(200).json(activities);
};

export const countActivities = async (req, res) => {
  const { filters } = req?.query ?? {};
  const filter = JSON.parse(filters) || {};

  const where = filterToWhere(filter);
  const count = await Activitie.count({ where });
  if (!count) {
    return res.status(500).json({ message: 'Error al contar las actividades' });
  }
  return res.status(200).json({ count });
};
