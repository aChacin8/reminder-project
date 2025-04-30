const ModelUsers = require ('../models/Users')
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey"; // Clave secreta para firmar los tokens JWT

const registerUser = async (req, res) => {
    try {
        const { password, ...rest} = req.body
        const hashPassword= await bcrypt.hash(password, 10)// Encriptar la contraseña
        const user= await ModelUsers.createUser(
            { 
                ...rest, 
                password: hashPassword 
            })// Crear el usuario
            res.status(201).json(user)
    } catch (error) {
        console.log('Error en registerUser:', error);
        res.status(400).json({ message: 'Error al registrar el usuario', error })
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await ModelUsers.findEmail(email); // Verifica si el email existe
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const validPassword = await bcrypt.compare(password, user.password); // Compara la contraseña ingresada con la almacenada
        if(!validPassword){
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({id: user.id, email: user.email}, SECRET_KEY, {expiresIn: '8h'}); // Crea el token JWT
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
        sessionStorage.setItem('token', token); // Almacena el token en sessionStorage
    } catch (error) {
        res.status(400).json({ message: 'Error al iniciar sesión', error })
    }
}

module.exports = {
    loginUser,
    registerUser
}