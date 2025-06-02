const knex = require ('../config')
const { hashEmail, hashToken } = require ('../utils/hash') // Importa la función de hash para el email

const createUser = async (bodyUser) => {
  const [id] = await knex('users')
  .insert(bodyUser); // Devuelve el id autoincremental
  return knex('users')
  .where('id_users', id)
  .first(); // Retorna el usuario recién creado
};

const viewAll = () => {
    return knex
        .select('*')
        .from('users')
        .where('active', true)
}

const findEmail = (email) => {
    const hashedEmail = hashEmail(email); // Asegúrate de convertir a minúsculas
    return knex
        .select('*')
        .from('users')
        .where({email:hashedEmail}) //Confirma que el email existe
        .andWhere('active', true)
        .first()
}

const findById = (idUsers) => {
    return knex ('users')
        .where('id_users', idUsers)
        .first()
}

const updateUser = (idUsers, bodyUser) => {
    console.log('Actualizando usuario con ID:', idUsers);
    console.log('Datos a actualizar:', bodyUser);
    return knex('users')
        .where('id_users', idUsers)
        .update(bodyUser)
        .then(userUpdated => {
            console.log('Filas actualizadas:', userUpdated); // <--- esto es importante
            return knex('users')
                .where('id_users', idUsers)
                .first();
        })
        .catch(error => {
            console.error('Error al actualizar el usuario:', error);
            throw error;
        });
}

const findToken = (token) => {
    return knex
        .select('*')
        .from('users')
        .where({token: hashToken(token)}) //Confirma que el token existe
        .andWhere('active', true)
        .first()
}

const updateToken = (id, token) => {
    return knex('users')
        .where('id_users', id)
        .update({ token: hashToken(token)})
        .then(() => {
            return knex('users')
                .where('id_users', id)
                .first()
        })
        .catch((error) => {
            console.error('Error al actualizar el token:', error);
            throw error; // Lanza el error para que pueda ser manejado por el controlador
        });
    }

module.exports = {
    createUser,
    viewAll,
    findEmail,
    findById,
    updateUser,
    findToken,
    updateToken
}