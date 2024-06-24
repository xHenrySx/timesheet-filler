import DataTable from '../database/models/datatable.model.js';

export const getDataTables = async (req, res) => {
  try {
    const { query } = req;
    const tableId = query?.table_id;
    const where = {};
    if (tableId) {
      where.table_id = tableId;
    }
    const dataTables = await DataTable.findAll({ where });
    return res.status(200).json(dataTables);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
