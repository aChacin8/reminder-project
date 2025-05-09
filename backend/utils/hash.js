const crypto = require('crypto');
process.loadEnvFile() // Carga las varibles de entorno del archivo .env

const hashEmail = (email) => {
    return crypto.createHash('sha256').update(email).digest('hex'); // Encriptar el email
}

const hashToken = (token) => {
    const secret = process.env.HASH_SECRET || 'tokensecret';
    return crypto.createHmac('sha256', secret).update(token).digest('hex');
};

module.exports = {
    hashEmail,
    hashToken
}