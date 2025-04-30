process.loadEnvFile() // Carga las varibles de entorno del archivo .env
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: process.env.DB_CLIENT_DEV, // Se obtiene el cliente de la base de datos desde las variables de entorno
    connection: {
      host: process.env.DB_HOST_DEV, // Se obtiene el host de la base de datos desde las variables de entorno
      database: process.env.DB_NAME_DEV, // Se obtiene el nombre de la base de datos desde las variables de entorno
      user: process.env.DB_USER_DEV, // Se obtiene el usuario de la base de datos desde las variables de entorno     
      password: process.env.DB_PASSWORD_DEV // Se obtiene la contraseña de la base de datos desde las variables de entorno
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations' // Se indica la tabla donde se guardaran las migraciones
    },
    seeds:{
      directory: './data/seeds' // Se indica la ruta donde se encuentran los seeds
    }
  },

  staging: {
    client: process.env.DB_CLIENT_DEV,
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds:{
      directory: './data/seeds'
    }
  },

  production: {
    client: process.env.DB_CLIENT_DEV,
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds:{
      directory: './data/seeds'
    }
  }

};
