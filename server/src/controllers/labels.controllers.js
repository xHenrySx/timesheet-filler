import Label from '../database/models/labels.model.js';

/**
 * Obtiene todas las etiquetas - proyectos
 */
export const getLabels = async (_req, res) => {
  try {
    const labels = await Label.findAll();
    return res.status(200).json(labels);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Guarda una nueva etiqueta - proyecto
 */

export const saveLabel = async (req, res) => {
  try {
    const { body } = req;
    if (!body.name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    await Label.create(body);
    return res.status(201).json({message: 'Label created'});
  } catch (error) {
    console.log(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Label already exists' });
    } else if (error.name === 'SequelizeDatabaseError') {
      return res.status(500).json({ message: 'Database error' });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateLabel = async (req, res) => {
  try {
    const { body } = req;
    if (!body?.name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    if (!req?.params) {
      return res.status(400).json({ message: 'Params with name are required' });
    }

    const { name } = req.params;

    await Label.update(body, {
      where: {
        name,
      },
    });
    return res.status(200).json({ message: 'Label updated' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteLabel = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({ message: 'Params with name are required' });
    }
    const { name } = req.params;

    const label = await Label.destroy({
      where: {
        name,
      },
    });
    return res.status(200).json(label);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
