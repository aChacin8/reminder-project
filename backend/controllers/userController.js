const ModelUsers = require ('../models/Users')
const { response } = require ('express')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')

const createUser = async (req, res) => {
    try {
        const { password, ...rest} = req.body
        const hashPassword= await bcrypt.hash(password, 10)// Encriptar la contraseña
        const user= await ModelUsers.createUser(
            { 
                ...rest, 
                password: hashPassword 
            })// Crear el usuario
            res.status(201).json(user)
            console.log("Usuario creado:", user);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el usuario', error })
    }
}

const viewAllUsers = (req, res) => {
    ModelUsers
        .viewAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(400).json({ message: 'Error al encontrar los usuarios', error })
        })
}

module.exports = {
    createUser,
    viewAllUsers,
}