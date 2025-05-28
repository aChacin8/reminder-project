const cron = require('node-cron');
const knex = require('../config');
const socketIo = require('socket.io');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'; // URL del frontend
let io; // Para acceder a la instancia desde otras partes

const initWebSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: `${FRONTEND_URL}`,
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('Usuario conectado al WebSocket');

        socket.on('join-user-room', (userId) => {
            if (userId) {
                console.log(`Usuario ${userId} se unió a la sala: ${userId}`);
                socket.join(userId.toString());
            }
        });
    });

    // Cron para verificar eventos que expiran en las siguientes 24 horas
    cron.schedule('0 * * * *', async () => {
        console.log('Verificando eventos por vencerse...');

        const now = new Date();
        const in24hrs = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        try {
            const events = await knex('events')
                .whereBetween('event_end_date', [now.toISOString(), in24hrs.toISOString()])
            if (events.length === 0) {
                console.log('No hay eventos por vencer');
            } else {
                events.forEach((event) => {
                    console.log(`Enviando notificación a sala ${event.id_users}`);
                    io.to(event.id_users.toString()).emit('event-expiring', {
                        message: `El evento "${event.event_name}" está por vencer.`,
                        eventId: event.id_events,
                        userId: event.id_users
                    });
                });
            }
        } catch (error) {
            console.error('Error al verificar eventos por vencerse:', error);
        }
    });
};

module.exports = initWebSocket;
