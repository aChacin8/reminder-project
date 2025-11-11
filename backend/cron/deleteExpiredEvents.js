const cron = require('node-cron');
const { db } = require('../config');

const deleteExpiredEvents = async () => {
  cron.schedule('* * * * *', async () => { // se ejecuta cada minuto
    const now = new Date();

    try {
      const deleted = await db('events')
        .where('event_end_date', '<', now)
        .del();

      console.log(`[CRON] Eventos expirados eliminados: ${deleted}, en ${now}`);
    } catch (error) {
      console.log(`[CRON] Error al eliminar eventos expirados: ${error.message}`);
    }
  });
};

module.exports = deleteExpiredEvents;
