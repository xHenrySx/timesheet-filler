import Activitie from '../database/models/activities.model.js';

/**
 * @param {Request} req - Objeto de solicitud
 * @param {Response} res - Objeto de respuesta
 * @returns {Promise<Response>}
 */
export const createActivitie = async ({ body }, res) => {
  const { date, description, duration } = body;

  if (!date || !description || !duration) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const newActivitie = new Activitie({
    date,
    description,
    duration,
  });

  await newActivitie.save();

  return res.status(200).json('Activitie created');
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getActivities = async (req, res) => {
  const activities = await Activitie.findAll();

  if (!activities) {
    return res.status(404).json({ message: 'No activities found' });
  }

  return res.status(200).json(activities);
};
