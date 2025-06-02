const ModelUsers = require('../models/Users')
const { decrypt } = require('../utils/crypto');

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

const findById = async (req, res) => {
    try {
        const { idUsers } = req.params;
        const user = await ModelUsers.findById(idUsers);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        const decryptedUser = {
            ...user, 
            address: decrypt(user.address),
            phone_num: decrypt(user.phone_num),
        }
        res.status(200).json(decryptedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error al encontrar el usuario', error });
        console.log('Error en findById:', error);   
    }
};

module.exports = {
    createUser,
    viewAllUsers,
    findById
}