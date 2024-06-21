import DataTable from '../database/models/datatable.model.js';

export const getDataTables = async (_req, res) => {
  try {
    const dataTables = await DataTable.findAll();
    return res.status(200).json(dataTables);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
