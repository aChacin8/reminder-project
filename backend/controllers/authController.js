const ModelUsers = require ('../models/Users')
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey"; // Clave secreta para firmar los tokens JWT
const { hashEmail, hashToken } = require ('../utils/hash') // Importa la función de hash para el email
const {verifyToken} = require ('../middlewares/authMiddleware') // Importa el middleware de verificación de token

const registerUser = async (req, res) => {
    try {
        const { password, email, address, phone_num, ...rest} = req.body
        const hashPassword= await bcrypt.hash(password, 10)// Encriptar la contraseña
        const hashedEmail = hashEmail(email.toLowerCase()); // Encripta el email
        const hashedAddress = await bcrypt.hash(address, 10) // Encriptar la dirección
        const hashedPhone = await bcrypt.hash (phone_num, 10) // Encriptar el teléfono
        const token = jwt.sign(
            {
                email: hashedEmail
            }, 
                SECRET_KEY, 
                {expiresIn: '8h'}
            ); // Crea el token JWT
        const hashedToken = hashToken(token); // Encripta el token
        const user= await ModelUsers.createUser(
            { 
                ...rest,
                address: hashedAddress,
                phone_num: hashedPhone,
                email: hashedEmail,
                password: hashPassword,
                token: hashedToken, // Almacena el token en la base de datos
                active: true // Asegúrate de que el usuario esté activo al registrarse 
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
        const token = jwt.sign(
            {
                id_users: user.id_users, 
                email: user.email
            }, 
                SECRET_KEY, 
                {expiresIn: '8h'}
            ); // Crea el token JWT
        
        const hashedToken = hashToken(token); // Encripta el token
        await ModelUsers.updateToken(user.id_users, hashedToken); // Actualiza el token en la base de datos
                    
        res.status(200).json({ message: 'Inicio de sesión exitoso', token});
    } catch (error) {
        res.status(400).json({ message: 'Error al iniciar sesión', error })
    }
}

const getTokenByEmail = async (req, res)=> {
    console.log("BODY:", req.body); // Verifica el cuerpo recibido

    const {email} = req.body;

    try {
        const user = await ModelUsers.findEmail(email); // Verifica si el email existe
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas, Usuario no encontrado' });
        }

        if (!user.token) {
            return res.status(401).json({ message: 'Credenciales inválidas, Token no encontrado' });
        }
        res.status(200).json({ message: 'Token encontrado', token: user.token });

    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el token', error })
    }
}

module.exports = {
    loginUser,
    registerUser,
    getTokenByEmail
}