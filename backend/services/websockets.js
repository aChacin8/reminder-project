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

    // Cron para verificar eventos que expiran en los siguientes 15 minutos
    cron.schedule('* * * * *', async () => {
        console.log('Verificando eventos por vencerse...');

        const now = new Date();
        // const in24hrs = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const in5mins = new Date(now.getTime() + 5 * 60 * 1000);

        try {
            const events = await knex('events')
                .whereBetween('event_start_date', [now, in5mins])
                .andWhere('active', true)
                .andWhere('notified', false)
                if (events.length === 0 ) {
                console.log('No se encontraron eventos por vencerse sin notificar.');
                } else {
                    await Promise.all (events.map(async (event) => {
                    console.log(`Enviando notificación a sala ${event.id_users}`);
                    io.to(event.id_users.toString()).emit('event-expiring', {
                        message: `El evento "${event.event_name}" está por iniciar (En menos de 5 minutos). El dia ${new Date(event.event_start_date).toLocaleString()}`, 
                        eventId: event.id_events,
                        userId: event.id_users
                    });
                    await knex('events')
                        .where('id_events', event.id_events)
                        .update('notified', true); // Marca el evento como notificado
                    }));
            }
        } catch (error) {
            console.error('Error al verificar eventos por vencerse:', error);
        }
    });
};

module.exports = initWebSocket;
