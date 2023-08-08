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

export const EncryptionService = {
  generateRandomBytes,
  generatePinDerivedKey,
  generateEncryptedRecoveryKey,
};
