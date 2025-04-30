const express = require('express')
const userRoutes = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

userRoutes.post('/users', userController.createUser) // Crear un nuevo usuario
userRoutes.get('/users', userController.viewAllUsers) // Visualizar todos los usuarios

userRoutes.post('/register', authController.registerUser) // Registrar un nuevo usuario
userRoutes.post('/login',authController.loginUser) // Iniciar sesión
module.exports = userRoutes