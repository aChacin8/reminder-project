require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');

const { db, initializeDB } = require('./db'); // Archivo db.js con Knex + migraciones/seeds
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventsRoutes');
const deleteExpiredEvents = require('./cron/deleteExpiredEvents'); // Cron
const initWebSocket = require('./services/websockets');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permite el acceso desde cualquier origen
app.use(express.json()); // Body parser

// Rutas
app.use('/taskly', userRoutes);
app.use('/taskly', eventRoutes);

// Cron y WebSocket
deleteExpiredEvents();
initWebSocket(server);

// Inicializar DB y luego levantar servidor
initializeDB().then(() => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Error al inicializar la base de datos:', err);
});
