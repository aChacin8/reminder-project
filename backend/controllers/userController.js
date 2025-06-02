const ModelUsers = require('../models/Users')
const { decrypt, encrypt } = require('../utils/crypto');

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

const updateUser = async (req,res) => {
    const { idUsers } = req.params;
    const { first_name, last_name, address, phone_num } = req.body;

    try {
        const user = await ModelUsers.findById(idUsers);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        console.log('Usuario antes de actualizar:', user);

        const encryptedAddress = encrypt(address);
        const encryptedPhone = encrypt(phone_num);

        console.log('Datos cifrados a actualizar:', { 
            first_name, 
            last_name, 
            address: encryptedAddress, 
            phone_num: encryptedPhone 
        });

        const updatedUser = await ModelUsers.updateUser(idUsers, {
            first_name,
            last_name,
            address: encryptedAddress,
            phone_num: encryptedPhone
        });

        console.log('Usuario actualizado en BD:', updatedUser);

        const {created_at, ...dataToUpdate} = {
            ...updatedUser,
            address: decrypt(updatedUser.address),
            phone_num: decrypt(updatedUser.phone_num),
        };

        return res.status(200).json(dataToUpdate);
    } catch (error) {
        console.error('Error en updateUser:', error);
        return res.status(400).json({ message: 'Error al actualizar el usuario', error });
    }
};

module.exports = {
    createUser,
    viewAllUsers,
    findById,
    updateUser
}