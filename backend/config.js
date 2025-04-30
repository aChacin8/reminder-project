const enviroment = process.env.NODE_ENV || 'development'; //Corre la variable de entorno, si no hay, corre en development
const knex = require('knex'); //Importa la libreria knex
const knexFile = require('./knexfile.js'); //Importa el archivo knexfile.js

module.exports = knex(knexFile[enviroment]); //Exporta la configuracion de knex, dependiendo del entorno