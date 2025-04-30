process.loadEnvFile() // Carga las varibles de entorno del archivo .env
const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const eventRoutes = require('./routes/eventsRoutes')

const app = express()
const port = process.env.PORT || 3000

app.use(cors()) // Permite el acceso a la API desde cualquier origen
app.use(express.json()) //Maneja el body de las peticiones en formato JSON
app.use('/taskly', userRoutes)
app.use('/taskly', eventRoutes) //Rutas de la API

app.listen(port, () => {
  console.log(`Server is running on port ${port}`) //Se imprime el puerto en el que corre el servidor
  console.log(`http://localhost:${port}`) 
})