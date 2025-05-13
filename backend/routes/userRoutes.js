    const express = require('express')
    const userRoutes = express.Router()
    const userController = require('../controllers/userController')
    const authController = require('../controllers/authController')
    const verifyToken = require('../middlewares/authMiddleware')

    userRoutes.post('/users', userController.createUser) // Crear un nuevo usuario
    userRoutes.get('/users', userController.viewAllUsers) // Visualizar todos los usuarios
    userRoutes.get('/users/:idUsers', verifyToken, userController.findById)

    userRoutes.post('/register', authController.registerUser) // Registrar un nuevo usuario
    userRoutes.post('/login',authController.loginUser) // Iniciar sesión

    userRoutes.get('/token', authController.getTokenByEmail) // Obtener el token por email
    userRoutes.get('/verify-token', verifyToken, (req, res) => {
        res.status(200).json({ message: 'Token válido' }) // Verificar el token
    }) // Verificar el token

    module.exports = userRoutes