const crypto = require('crypto');

const hashEmail = (email) => {
    return crypto.createHash('sha256').update(email).digest('hex'); // Encriptar el email
}

module.exports = {
    hashEmail
}