process.loadEnvFile() // Carga las varibles de entorno del archivo .env

const userRoutes = require('./routes/userRoutes')
const eventRoutes = require('./routes/eventsRoutes')
const deleteExpiredEvents = require('./cron/deleteExpiredEvents') // Importa el cron para eliminar eventos expirados
const initWebSocket = require('./services/websockets')

const express = require('express')
const cors = require('cors')
const http = require ('http')

const app = express()
const server = http.createServer(app) // 
const port = process.env.PORT || 3000

app.use(cors()) // Permite el acceso a la API desde cualquier origen
app.use(express.json()) //Maneja el body de las peticiones en formato JSON
app.use('/taskly', userRoutes) //Rutas de la API usuarios
app.use('/taskly', eventRoutes) //Rutas de la API eventos

deleteExpiredEvents(); // Inicia el cron para eliminar eventos expirados
initWebSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`) //Se imprime el puerto en el que corre el servidor
  console.log(`http://localhost:${port}`) 
})