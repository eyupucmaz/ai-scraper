import crypto from 'crypto';

// Get encryption key from environment variable
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length < 32) {
  console.error('ENCRYPTION_KEY must be at least 32 characters long');
}

// Algorithm to use for encryption
const ALGORITHM = 'aes-256-cbc';

/**
 * Encrypts a string using AES-256-CBC
 * @param text The text to encrypt
 * @returns The encrypted text as a hex string with IV prepended
 */
export function encrypt(text: string): string {
  if (!ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY not set');
  }

  try {
    // Generate a random initialization vector
    const iv = crypto.randomBytes(16);

    // Create cipher with key and IV
    const key = crypto.createHash('sha256').update(String(ENCRYPTION_KEY)).digest('base64').substring(0, 32);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    // Encrypt the text
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Prepend the IV to the encrypted text (we'll need it for decryption)
    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Error encrypting data');
  }
}

/**
 * Decrypts a string that was encrypted with the encrypt function
 * @param encryptedText The encrypted text with IV prepended
 * @returns The decrypted string
 */
export function decrypt(encryptedText: string): string {
  if (!ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY not set');
  }

  try {
    // Split the IV and encrypted text
    const textParts = encryptedText.split(':');
    if (textParts.length !== 2) {
      throw new Error('Invalid encrypted text format');
    }

    const iv = Buffer.from(textParts[0], 'hex');
    const encryptedData = textParts[1];

    // Create decipher with key and IV
    const key = crypto.createHash('sha256').update(String(ENCRYPTION_KEY)).digest('base64').substring(0, 32);
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    // Decrypt the text
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Error decrypting data');
  }
}

/**
 * Generates a random API key
 * @returns A random API key
 */
export function generateApiKey(): string {
  return crypto.randomBytes(32).toString('hex');
}