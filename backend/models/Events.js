const knex = require ('../config')

const createEvent = (bodyEvent) => {
    return knex
        .insert(bodyEvent)
        .into('events')
        .returning('*')
}

const viewAll = () => {
    return knex
        .select('*')
        .from('events')
        .where('active', true)
}

module.exports = {
    createEvent,
    viewAll
}