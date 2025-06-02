    const express = require('express')
    const userRoutes = express.Router()
    const userController = require('../controllers/userController')
    const authController = require('../controllers/authController')
    const verifyToken = require('../middlewares/authMiddleware')

    userRoutes.post('/users', userController.createUser) 
    userRoutes.get('/users', userController.viewAllUsers) 
    userRoutes.get('/users/:idUsers', verifyToken, userController.findById)
    userRoutes.patch('/users/:idUsers', verifyToken, userController.updateUser)

    userRoutes.post('/register', authController.registerUser)
    userRoutes.post('/login',authController.loginUser) 

    userRoutes.get('/token', authController.getTokenByEmail) 
    userRoutes.get('/verify-token', verifyToken, (req, res) => {
        res.status(200).json({ message: 'Token válido' }) 
    }) // Verificar el token

    module.exports = userRoutes