import CryptoJS from 'crypto-js';
import QuickCrypto from 'react-native-quick-crypto';

import { VALIDATION_STRING } from '@jl/constants';

import { ToastService } from '../toast-service';

const generateRandomBytes = (size: number): string => {
  const randomBytes = QuickCrypto.randomBytes(size);
  //@ts-ignore
  return randomBytes.toString('hex');
};

const generatePinDerivedKey = (pin: string, salt: string): string => {
  const pinDerivedKey = QuickCrypto.pbkdf2Sync(pin, salt, 1000000, 32, 'sha256');
  return pinDerivedKey.toString('hex');
};

const generateEncryptedRecoveryKey = (randomKey: string, pinDerivedKey: string) => {
  const encryptedRecoveryKey = CryptoJS.AES.encrypt(randomKey, pinDerivedKey).toString();
  return encryptedRecoveryKey;
};

const decryptRecoveryKey = async (encryptedRecoveryKey: string, pinDerivedKey: string): Promise<string> => {
  try {
    const decryptedRecoveryKey = await CryptoJS.AES.decrypt(encryptedRecoveryKey, pinDerivedKey).toString(
      CryptoJS.enc.Utf8,
    );
    return decryptedRecoveryKey;
  } catch (error) {
    ToastService.error('Something went wrong!', 'Please try again');
  }
};

const verifyOldPIN = async (oldPin: string, salt: string, encryptedRecoveryKey: string) => {
  try {
    const oldPinDerivedKey = generatePinDerivedKey(oldPin, salt);
    const decryptedMasterKey = await decryptRecoveryKey(encryptedRecoveryKey, oldPinDerivedKey);
    const isValid = decryptedMasterKey.startsWith(VALIDATION_STRING);

    return { isValidPIN: isValid, masterKey: decryptedMasterKey };
  } catch (error) {
    ToastService.error('Something went wrong!', 'Please try again');
  }
};

const generateNewEncryptedRecoveryKey = async (newPin: string, salt: string, masterKey: string) => {
  try {
    const newPINDerivedKey = generatePinDerivedKey(newPin, salt);
    const encryptedRecoveryKey = generateEncryptedRecoveryKey(masterKey, newPINDerivedKey);

    return encryptedRecoveryKey;
  } catch (error) {
    ToastService.error('Something went wrong!', 'Please try again');
  }
};

export const EncryptionService = {
  decryptRecoveryKey,
  verifyOldPIN,
  generateRandomBytes,
  generatePinDerivedKey,
  generateNewEncryptedRecoveryKey,
  generateEncryptedRecoveryKey,
};
