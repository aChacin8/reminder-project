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

const findById = (req, res) => {
  const { idUsers } = req.params;
  console.log("Solicitud para usuario con ID:", idUsers); // Asegúrate de que se recibe la solicitud

  ModelUsers.findById(idUsers)
    .then(user => {
      console.log("Usuario encontrado:", user);
      res.status(200).json(user);
    })
    .catch(error => {
      console.log("Error al encontrar el usuario:", error);
      res.status(400).json({ message: 'Error al encontrar los usuarios', error });
    });
};


module.exports = {
    createUser,
    viewAllUsers,
    findById
}