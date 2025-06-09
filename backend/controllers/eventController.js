const ModelEvent = require('../models/Events'); //Importa el modelo de eventos

const formatDateForMySQL = (date) => {
    const local = new Date(date);
    const yyyy = local.getFullYear();
    const mm = String(local.getMonth() + 1).padStart(2, '0');
    const dd = String(local.getDate()).padStart(2, '0');
    const hh = String(local.getHours()).padStart(2, '0');
    const min = String(local.getMinutes()).padStart(2, '0');
    const ss = '00';
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};

const createEvent = async (req, res) => {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.USER:", req.user);
    try {
        const { event_name, event_description, event_start_date, event_end_date, ...rest } = req.body; 
        const event = await ModelEvent.createEvent({
            ...rest,
            event_name,
            event_description,
            event_start_date,
            event_end_date,
            id_users: req.user.id_users //Agrega el id del usuario a la peticion
        }); 
        if (!event_name || !event_start_date || !event_end_date) { 
            return res.status(400).json({ message: 'Faltan campos obligatorios' }); 
        }
        if (event_start_date > event_end_date) { 
            return res.status(400).json({ message: 'La fecha de inicio no puede ser mayor a la fecha de fin' }); 
        }
        if (event_start_date < new Date()) { 
            return res.status(400).json({ message: 'La fecha de inicio no puede ser menor a la fecha actual' }); 
        }
        res.status(201).json(event); 
        console.log("Evento creado:", event);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el evento', error }); 
    }
}

const getAllEvents = async (req, res) => {
    try {
        const id_users = req.user.id_users; //Obtiene el id del usuario de la peticion        
        const events = await ModelEvent.viewAll(id_users); 
        res.status(200).json(events); 
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los eventos', error }); 
    }
}

const getEventById = async (req, res) => {
    try {
        const event = await ModelEvent.findById(req.params.id_events); 
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' }); 
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el evento, en getEvent', error }); 
    }
}

const updateEvent = async (req, res) => {
    try {
        const { id_events } = req.params; 
        const { event_name, event_description, event_start_date, event_end_date, ...rest } = req.body; 

        const existingEvent = await ModelEvent.findById(id_events); 

        if (!existingEvent) {
            return res.status(404).json({ message: 'Evento no encontrado' }); 
        }
        if (!event_name || !event_start_date || !event_end_date) { 
            return res.status(400).json({ message: 'Faltan campos obligatorios' }); 
        }

        const now = new Date();
        const startDate = new Date(event_start_date);
        const endDate = new Date(event_end_date);

        if (startDate < now.setHours(0, 0, 0, 0)) { 
            return res.status(400).json({ message: 'La fecha de inicio no puede ser menor a la fecha actual' });
        } else if (startDate > endDate) {
            return res.status(400).json({ message: 'La fecha de inicio no puede ser mayor a la fecha de fin' });
        }

        const formattedStartDate = formatDateForMySQL(event_start_date);
        const formattedEndDate = formatDateForMySQL(event_end_date);

        const { created_at, ...dataToUpdate } = {
            ...rest,
            event_name,
            event_description,
            event_start_date: formattedStartDate,
            event_end_date: formattedEndDate,
            id_users: req.user.id_users
        };

        const event = await ModelEvent.updateEvent(id_events, dataToUpdate);
        res.status(200).json(event);
        console.log("Evento actualizado:", event); //Muestra el evento actualizado en la consola
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el evento', error }); //Devuelve un error si no se puede actualizar el evento
        console.log("Error al actualizar el evento:", error); //Muestra el error en la consola
    }
}

const softDeleteEvent = async (req, res) => {
    try {
        const { id_events } = req.params; 
        const event = await ModelEvent.deleteEvent(id_events); //Llama a la funcion deleteEvent del modelo

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' }); 
        }
        res.status(200).json({ message: 'Evento eliminado' }); 
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el evento', error }); 
    }
}

const destroyEvent = async (req, res) => {
    try {
        const { id_events } = req.params; 
        const event = await ModelEvent.destroyEvent(id_events); //Llama a la funcion destroyEvent del modelo

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' }); 
        }
        res.status(200).json({ message: 'Evento eliminado' }); 
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el evento', error }); 
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