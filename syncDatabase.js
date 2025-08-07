// Script para sincronizar la base de datos con los nuevos campos
const sequelize = require('./servermysql/config/sequelize.config');

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // alter: true actualiza las tablas existentes
    console.log('Base de datos sincronizada exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
    process.exit(1);
  }
};

syncDatabase();
