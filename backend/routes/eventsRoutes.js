const express = require('express');
const eventRoutes = express.Router();
const eventController = require('../controllers/eventController');
const verifyToken = require('../middlewares/authMiddleware'); // Importa el middleware de verificación de token

eventRoutes.post('/events', verifyToken, eventController.createEvent); // Crear un nuevo evento
eventRoutes.get('/events',verifyToken, eventController.getAllEvents); // Obtener todos los eventos
eventRoutes.get('/events/:id_events', eventController.getEventById); // Obtener un evento por ID
eventRoutes.patch('/events/:id_events',eventController.updateEvent); // Actualizar un evento por ID
eventRoutes.delete('/events/:id_events', eventController.softDeleteEvent); // Eliminar un evento por ID (soft delete)
eventRoutes.delete('/events/:id_events/hard', eventController.destroyEvent); // Eliminar un evento por ID (hard delete)

module.exports = eventRoutes;