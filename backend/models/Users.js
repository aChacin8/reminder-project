const knex = require ('../config')
const { hashEmail } = require ('../utils/hash') // Importa la función de hash para el email

const createUser = (bodyUser) => {
    return knex
        .insert(bodyUser)
        .into('users')
        .returning('*')
}
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

module.exports = {
    createUser,
    viewAll,
    findEmail
}