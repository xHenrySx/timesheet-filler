import Activitie from '../database/models/activities.model.js';
import { filterToWhere } from '../utils/database.js';

/**
 * @param {Request} req - Objeto de solicitud
 * @param {Response} res - Objeto de respuesta
 * @returns {Promise<Response>}
 */
export const createActivitie = async (req, res) => {
  try {
    const { body } = req;
    const newActivitie = Activitie.build(body);
    const response = await newActivitie.save();

    if (!response) {
      return res.status(500).json({ message: 'Error al crear la actividad' });
    }


    return res.status(200).json({ message: 'Activitie created' });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ message: 'Un campo no existe en la base de datos.' });
    } else {
      return res.status(500).json({ message: 'Error al crear la actividad' });
    }
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getActivities = async (req, res) => {
  const { first, rows, page, sortField, sortOrder, filters } = req?.query ?? {};
  const filter = filters ? JSON.parse(filters) : {};
  const limit = parseInt(rows, 10) || 5;
  const offset = ((parseInt(page, 10) || 1) - 1) * limit;
  let validSortOrder = 'ASC';
  if (sortOrder === '-1') {
    validSortOrder = 'DESC';
  }
  const order =
    sortField && sortField !== 'null' ? [[sortField, validSortOrder]] : [];

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
  return res.status(200).json({ count });
};

export const getAutoCompleteData = async (req, res) => {
  const data = {};
  const description = await Activitie.findAll({
    attributes: ['description', 'jiraClient', 'jiraClientTicket'],
    group: ['description', 'jiraClient', 'jiraClientTicket', 'label'],
  });

  if (!description) {
    return res.status(500).json({ message: 'Error al obtener la descripción' });
  }

  data.description = description.map(item => item.description);
  data.jiraClient = description.map(item => item.jiraClient);
  data.jiraClientTicket = description.map(item => item.jiraClientTicket);
  data.label = description.map(item => item.label);

  return res.status(200).json(data);
};


export const deleteActivities = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({ message: 'No se encontro el id.' });
    }
    const { id } = req.params;

    const activitie = await Activitie.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: 'Activitie eliminada.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};