const { db } = require('../config');
const { hashEmail, hashToken } = require('../utils/hash');

// Crear usuario
const createUser = async (bodyUser) => {
  const [id] = await db('users').insert(bodyUser);
  return db('users')
    .where('id_users', id)
    .first();
};

// Ver todos los usuarios activos
const viewAll = () => {
  return db('users')
    .select('*')
    .where('active', true);
};

// Buscar usuario por email
const findEmail = (email) => {
  const hashedEmail = hashEmail(email);
  return db('users')
    .select('*')
    .where({ email: hashedEmail })
    .andWhere('active', true)
    .first();
};

// Buscar usuario por ID
const findById = (idUsers) => {
  return db('users')
    .where('id_users', idUsers)
    .first();
};

// Actualizar usuario
const updateUser = (idUsers, bodyUser) => {
  console.log('Actualizando usuario con ID:', idUsers);
  console.log('Datos a actualizar:', bodyUser);

  return db('users')
    .where('id_users', idUsers)
    .update(bodyUser)
    .then(() => {
      return db('users')
        .where('id_users', idUsers)
        .first();
    })
    .catch((error) => {
      console.error('Error al actualizar el usuario:', error);
      throw error;
    });
};

// Buscar token
const findToken = (token) => {
  return db('users')
    .select('*')
    .where({ token: hashToken(token) })
    .andWhere('active', true)
    .first();
};

// Actualizar token
const updateToken = (id, token) => {
  return db('users')
    .where('id_users', id)
    .update({ token: hashToken(token) })
    .then(() => {
      return db('users')
        .where('id_users', id)
        .first();
    })
    .catch((error) => {
      console.error('Error al actualizar el token:', error);
      throw error;
    });
};

module.exports = {
  createUser,
  viewAll,
  findEmail,
  findById,
  updateUser,
  findToken,
  updateToken
};
