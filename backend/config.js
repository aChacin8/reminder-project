const knex = require('knex');
const knexFile = require('./knexfile.js');

const environment = process.env.NODE_ENV || 'development';
const db = knex(knexFile[environment]);

const initializeDB = async () => {
  try {
    console.log('Aplicando migraciones...');
    await db.migrate.latest();
    console.log('Migraciones aplicadas');
  } catch (err) {
    console.error('Error al inicializar la base de datos:', err);
  }
};

module.exports = { db, initializeDB };
