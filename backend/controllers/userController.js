const ModelUsers = require('../models/Users')


const createUser = async (req, res) => {
    try {
        const user = await ModelUsers.createUser()
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

    ModelUsers
    .findById(idUsers)
        .then(user => {
            res.status(200).json(user);
            console.log("Usuario encontrado:",  user);
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