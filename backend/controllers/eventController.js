const ModelEvent = require('../models/Events'); //Importa el modelo de eventos

const createEvent = (req, res) => {
    const {name, description, start_date, end_date, color} = req.body; //Desestructura el body de la peticion
    const id_user = req.user.id_users; //id del usuario logueado
    const event = {
        id_users: id_user, 
        event_name: name,
        event_description: description,
        event_start_date: start_date,
        event_end_date: end_date,
        color: color
    }; //Crea un objeto con los datos del evento
    
    ModelEvent.createEvent(req.body) //Llama a la funcion createEvent del modelo
            .then((event)=>{
                res.status(201).json(event); //Devuelve el evento creado
            })
            .catch((error)=>{
                res.status(500).json({message: 'Error al crear el evento', error}); //Devuelve un error si no se puede crear el evento
            })
}

const getAllEvents = (req, res) => {
    ModelEvent.viewAll(req.user.id_users) //Llama a la funcion getAllEvents del modelo
        .then((events)=>{
            res.status(200).json(events); //Devuelve todos los eventos
        })
        .catch((error)=>{
            res.status(500).json({message: 'Error al obtener los eventos', error}); //Devuelve un error si no se pueden obtener los eventos
        }) 
}

module.exports = {
    createEvent,
    getAllEvents
}