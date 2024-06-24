// database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/db.sqlite'
});

await sequelize.sync();

export default sequelize;
