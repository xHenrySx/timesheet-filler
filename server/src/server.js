import app from './app.js';
import sequelize from './database/database.js';
const PORT = process.env.PORT || 5000;
const alter = process.env.ALTER || false;

sequelize
  .sync({ force: false, alter: alter })
  .then(() => {
    console.log('Database is connected');
    try {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  })
  .catch(e => {
    console.log(e);
  });
