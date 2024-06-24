//models/DataTable.js
import DataTypes from 'sequelize';
import sequelize from '../database.js';
const DataTable = sequelize.define('DataTable', {
  column_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  visual_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  table_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default DataTable;
