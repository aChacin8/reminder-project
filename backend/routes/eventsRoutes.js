const express = require('express');
const eventRoutes = express.Router();
const eventController = require('../controllers/eventController');

eventRoutes.post('/events', eventController.createEvent); // Crear un nuevo evento
eventRoutes.get('/events', eventController.getAllEvents); // Obtener todos los eventos

module.exports = eventRoutes;