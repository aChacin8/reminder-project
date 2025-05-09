const ModelEvent = require('../models/Events'); //Importa el modelo de eventos

const createEvent = async (req, res) => {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.USER:", req.user);
    try {
        const { event_name, event_description, event_start_date, event_end_date, ...rest } = req.body; //Desestructura el body de la peticion
        const event = await ModelEvent.createEvent({
            ...rest,
            event_name,
            event_description,
            event_start_date ,
            event_end_date,
            id_users: req.user.id_users //Agrega el id del usuario a la peticion
        }); //Llama a la funcion createEvent del modelo
        if (!event_name || !event_start_date || !event_end_date) { //Verifica que los campos no esten vacios
            return res.status(400).json({ message: 'Faltan campos obligatorios' }); //Devuelve un error si faltan campos obligatorios
        }
        if (event_start_date > event_end_date) { //Verifica que la fecha de inicio sea menor a la fecha de fin
            return res.status(400).json({ message: 'La fecha de inicio no puede ser mayor a la fecha de fin' }); //Devuelve un error si la fecha de inicio es mayor a la fecha de fin
        }
        if (event_start_date < new Date()) { //Verifica que la fecha de inicio no sea menor a la fecha actual
            return res.status(400).json({ message: 'La fecha de inicio no puede ser menor a la fecha actual' }); //Devuelve un error si la fecha de inicio es menor a la fecha actual
        }
        res.status(201).json(event); //Devuelve el evento creado
        console.log("Evento creado:", event); //Muestra el evento creado en la consola
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el evento', error }); //Devuelve un error si no se puede crear el evento
    }
}

const getAllEvents = async (req, res) => {
    try {
        const id_users = req.user.id_users; //Obtiene el id del usuario de la peticion
        console.log("ID_USERS:", id_users); //Muestra el id del usuario en la consola
        
        const events = await ModelEvent.viewAll(id_users); //Llama a la funcion viewAll del modelo
        res.status(200).json(events); //Devuelve todos los eventos
        console.log("Eventos obtenidos:", events); //Muestra los eventos obtenidos en la consola
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los eventos', error }); //Devuelve un error si no se pueden obtener los eventos
    }
}

const getEventById = async (req,res)=> {
    try {
        const event = await ModelEvent.getEventById(req.params.id_events); //Llama a la funcion getEventById del modelo
        if (!event){
            return res.status(404).json({ message: 'Evento no encontrado' }); //Devuelve un error si no se encuentra el evento
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el evento, en getEvent', error }); //Devuelve un error si no se puede obtener el evento
    }
}

const updateEvent = async (req, res) => {
    try {
        const {id_events} = req.params; //Desestructura el id del evento de la peticion
        const { event_name, event_description, event_start_date, event_end_date, ...rest } = req.body; //Desestructura el body de la peticion
        
        const existingEvent = await ModelEvent.getEventById(id_events); //Llama a la funcion getEventById del modelo
        if (!existingEvent) {
            return res.status(404).json({ message: 'Evento no encontrado' }); //Devuelve un error si no se encuentra el evento
        }

        const event = await ModelEvent.updateEvent({
            ...rest,
            event_name,
            event_description,
            event_start_date ,
            event_end_date,
            id_users: req.user.id_users //Agrega el id del usuario a la peticion
        }); //Llama a la funcion updateEvent del modelo
        if(!event_name || !event_start_date || !event_end_date) { //Verifica que los campos no esten vacios
            return res.status(400).json({ message: 'Faltan campos obligatorios' }); //Devuelve un error si faltan campos obligatorios
        }
        if (event_start_date > event_end_date) { //Verifica que la fecha de inicio sea menor a la fecha de fin
            return res.status(400).json({ message: 'La fecha de inicio no puede ser mayor a la fecha de fin' }); //Devuelve un error si la fecha de inicio es mayor a la fecha de fin
        }
        if (event_start_date < new Date()) { //Verifica que la fecha de inicio no sea menor a la fecha actual
            return res.status(400).json({ message: 'La fecha de inicio no puede ser menor a la fecha actual' }); //Devuelve un error si la fecha de inicio es menor a la fecha actual
        }

        res.status(200).json(event);
        console.log("Evento actualizado:", event); //Muestra el evento actualizado en la consola
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el evento', error }); //Devuelve un error si no se puede actualizar el evento
    }
}

const softDeleteEvent = async (req,res)=> {
    try {
        const {id_events} = req.params; //Desestructura el id del evento de la peticion
        const event = await ModelEvent.deleteEvent(id_events); //Llama a la funcion deleteEvent del modelo
        
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' }); //Devuelve un error si no se encuentra el evento
        }
        res.status(200).json({ message: 'Evento eliminado' }); //Devuelve un mensaje
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el evento', error }); //Devuelve un error si no se puede eliminar el evento
    }
}

const destroyEvent = async (req,res)=> {
    try {
        const {id_events} = req.params; //Desestructura el id del evento de la peticion
        const event = await ModelEvent.destroyEvent(id_events); //Llama a la funcion destroyEvent del modelo
        
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' }); //Devuelve un error si no se encuentra el evento
        }
        res.status(200).json({ message: 'Evento eliminado' }); //Devuelve un mensaje
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el evento', error }); //Devuelve un error si no se puede eliminar el evento
    }
}

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    softDeleteEvent,
    destroyEvent
}