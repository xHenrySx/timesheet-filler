// models/Label.js
import DataTypes from 'sequelize';
import sequelize from '../database.js';
const Label = sequelize.define('Label', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Label;
