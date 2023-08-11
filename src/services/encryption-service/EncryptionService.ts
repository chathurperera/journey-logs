import CryptoJS from 'crypto-js';
import QuickCrypto from 'react-native-quick-crypto';

const generateRandomBytes = (size: number): string => {
  const randomBytes = QuickCrypto.randomBytes(size);
  //@ts-ignore
  return randomBytes.toString('hex');
};

const generatePinDerivedKey = (pin: string, salt: string): string => {
  const pinDerivedKey = QuickCrypto.pbkdf2Sync(pin, salt, 1000000, 32, 'sha256');
  return pinDerivedKey.toString('hex');
};

const generateEncryptedRecoveryKey = (recoveryKey: string, pinDerivedKey: string) => {
  const encryptedRecoveryKey = CryptoJS.AES.encrypt(recoveryKey, pinDerivedKey).toString();
  return encryptedRecoveryKey;
};

const decryptRecoveryKey = (encryptedRecoveryKey: string, pinDerivedKey: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedRecoveryKey, pinDerivedKey);
    const decryptedRecoveryKey = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedRecoveryKey;
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};

export const EncryptionService = {
  decryptRecoveryKey,
  generateRandomBytes,
  generatePinDerivedKey,
  generateEncryptedRecoveryKey,
};
