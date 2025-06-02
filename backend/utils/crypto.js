const crypto = require ('crypto');

const algorithm = 'aes-256-gcm'; // Algoritmo de cifrado alto
const secretKey = crypto.scryptSync(process.env.CRYPTO_KEY || 'clave-secreta', 'salt', 32); // clave segura
const ivLength = 12; // Longitud del vector de inicialización (IV) para aes-256-gcm

const encrypt = (text) => {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag(); // Obtiene el tag de autenticación
    return [
        iv.toString('hex'),
        encrypted.toString('hex'),
        authTag.toString('hex')
    ].join(':'); // Devuelve el IV, el texto cifrado y el tag de autenticación
};

const decrypt = (encryptedText) => {
    const [ivHex, encryptedDataHex, authTagHex] = encryptedText.split(':');
    
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedData = Buffer.from(encryptedDataHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    decipher.setAuthTag(authTag); // Establece el tag de autenticación para verificar la integridad

    const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
    return decrypted.toString('utf8');
};

module.exports = { encrypt, decrypt };