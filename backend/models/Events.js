const knex = require ('../config')

const createEvent = async (bodyEvent) => {
    const [id] = await knex('events')
    .insert(bodyEvent); // Devuelve el id autoincremental
    return knex('events')
    .where('id_events', id)
    .first(); // Retorna el evento recién creado
}

const viewAll = async () => {
    return knex('events')
        .select('*')
        .where('active', true)
}

const findById = async (idEvents) => {
    return knex('events')
        .select('*')
        .where('id_events', idEvents)
        .andWhere('active', true)
}

const updateEvent = async (idEvents, bodyEvents)=> {
    return knex('events')
        .where('id_events', idEvents)
        .update(bodyEvents)
        .andWhere('active', true)
}

const softDeleteEvent = async (idEvents)=> {
    return knex('events')
        .where('id_events', idEvents)
        .update({active: false}) // Cambia el estado a inactivo
}

const destroyEvent = async (idEvents)=> {
    return knex('events')
        .where('id_events', idEvents)
        .del() // Elimina el registro de la base de datos
}

module.exports = {
    createEvent,
    viewAll,
    findById,
    updateEvent,
    softDeleteEvent,
    destroyEvent
}