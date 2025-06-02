const cron = require('node-cron');
const knex = require ('../config')

const deleteExpiredEvents = async () => {
    cron.schedule('/30 * * * *', async () => { // Se ejecuta cada minuto
    const now = new Date(); // Obtiene la fecha y hora actual

    try {
        const deleted = await knex('events')
            .where('event_end_date', '<', now) // Filtra los eventos que han terminado
            .del(); // Elimina los eventos que han terminado
    console.log(`[CRON] Eventos expirados eliminados: ${deleted}, en ${now}`); // Muestra en consola los eventos eliminados
    
    } catch (error) {
        console.log(`[CRON] Error al eliminar eventos expirados: ${error.message}`);
    }
}) 
}

module.exports = deleteExpiredEvents; // Exporta la funcion deleteExpiredEvents
