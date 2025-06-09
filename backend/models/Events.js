const knex = require ('../config')

const createEvent = async (bodyEvent) => {
    const [id] = await knex('events')
    .insert(bodyEvent); // Devuelve el id autoincremental
    return knex('events')
    .where('id_events', id)
    .first(); // Retorna el evento recién creado
}

const viewAll = async (idUsers) => {
    return knex('events')
        .select('*')
        .where('active', true)
        .andWhere('id_users', idUsers)
}

const findById = async (idEvents) => {
    return knex('events')
        .select('*')
        .where('id_events', idEvents)
}

const findByName = async (eventName, idUsers) => {
    return knex('events')
        .select('*')
        .where('event_name', eventName)
        .orWhere('event_start_date', eventName)
        .orWhere('event_end_date', eventName)
        .andWhere('id_users', idUsers)
        .andWhere('active', true);
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