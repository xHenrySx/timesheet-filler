// models/Activity.js
import DataTypes from 'sequelize';
import sequelize from '../database.js';
import Label from './labels.model.js';
const Activitie = sequelize.define('Activitie', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  jiraTicket: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  jiraClientTicket: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
// Activitie can hace 1 label
// Label can have many activities
Activitie.belongsTo(Label, {
  foreignKey: 'label',
  targetKey: 'name',
});

Label.hasMany(Activitie, {
  foreignKey: 'label',
  sourceKey: 'name',
});

// Activitie.sync({ alter: true });

export default Activitie;
