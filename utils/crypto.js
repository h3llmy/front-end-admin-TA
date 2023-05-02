import crypto from 'crypto'
import config from '../main/appConfig'

export function encryptString(str) {
    const algorithm = 'AES-256-CBC';
    const key = crypto.scryptSync(config.COOKIE_PASSWORD, 'salt', 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(str, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

export function decryptString(str) {
    const algorithm = 'AES-256-CBC';
    const key = crypto.scryptSync(config.COOKIE_PASSWORD, 'salt', 32);
    const parts = str.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(parts.join(':'), 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}