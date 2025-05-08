const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrae el token del encabezado de autorización
    
    if(!token) {
        return res.status(401).json({ message: 'Token no proporcionado' }); // Devuelve un error si no se proporciona el token
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token usando la clave secreta
        req.user = decoded; // Almacena la información decodificada del token en el objeto de solicitud
        next(); // Llama a la siguiente función de middleware
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido', token }); // Devuelve un error si el token es inválido
    }
}

module.exports = verifyToken; // Exporta el middleware para su uso en otras partes de la aplicación