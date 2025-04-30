const knex = require ('../config')

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
    return knex
        .select('*')
        .from('users')
        .where({email}).first() //Confirma que el email existe
        .where('active', true)
}

module.exports = {
    createUser,
    viewAll,
    findEmail
}