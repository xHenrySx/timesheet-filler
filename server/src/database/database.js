// database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/db.sqlite' // Puedes especificar el path donde se guardará tu base de datos
});

export default sequelize;
