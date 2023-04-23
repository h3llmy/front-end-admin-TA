// Function to encrypt a string
function encryptString(str, secret) {
    const algorithm = 'AES-256-CBC';
    const key = crypto.scryptSync(secret, 'salt', 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(str, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }
  
  // Function to decrypt a string
  function decryptString(str, secret) {
    const algorithm = 'AES-256-CBC';
    const key = crypto.scryptSync(secret, 'salt', 32);
    const parts = str.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(parts.join(':'), 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
  const crypto = require('crypto');

  const secretKey = 'my-secret-key';
  const originalString = 'my secret message';
  
  // Encrypt the string
  const encryptedString = encryptString(originalString, secretKey);
  console.log('Encrypted string:', encryptedString);
  
  // Decrypt the string
  const decryptedString = decryptString(encryptedString, secretKey);
  console.log('Decrypted string:', decryptedString);
    