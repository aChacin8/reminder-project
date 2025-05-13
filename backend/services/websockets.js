const socketIo = require('socket.io');
const cron = require('node-cron');
const knex = require('../config');

let io; // Para acceder a la instancia desde otras partes

const initWebSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    // Cron para verificar eventos que expiran en las siguientes 24 horas
    cron.schedule('* * * * *', async () => {
        console.log('Verificando eventos por vencerse...');

        const now = new Date();
        const in24hrs = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        const events = await knex('events')
            .whereBetween('event_end_date', [now.toISOString(), in24hrs.toISOString()]);

        if (events.length === 0) {
            console.log('No hay eventos por vencer');
        } else {
            events.forEach((event) => {
                console.log(`Enviando notificación para evento: ${event.event_name}`);
                io.emit('event-expiring', {
                    message: `El evento "${event.event_name}" está por vencer.`,
                    eventId: event.id_event,
                    userId: event.id_users
                });
            });
        }
    });
};

module.exports = initWebSocket;
