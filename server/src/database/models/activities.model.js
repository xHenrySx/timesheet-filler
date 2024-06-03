// models/Activity.js
import DataTypes from 'sequelize';
import sequelize from '../database.js';
const Activitie = sequelize.define('Activitie', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  jiraTicket: {
    type: DataTypes.STRING,
    allowNull: true
  },
  jiraClientTicket: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default Activitie;
