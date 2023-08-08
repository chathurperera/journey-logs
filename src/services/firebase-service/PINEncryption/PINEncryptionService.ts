import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CryptoJS from 'crypto-js';

import { EncryptionService } from '../../encryption-service';
import { ToastService } from '../../toast-service/ToastService';

const IS_JEST_RUNTIME = typeof jest !== 'undefined';

const userId = !IS_JEST_RUNTIME ? auth().currentUser?.uid : '0e0a3edc-16d7-4791-add9-a23de0693b8e';

const createPin = async (PIN: string) => {
  try {
    const salt = EncryptionService.generateRandomBytes(16);
    const recoveryKey = EncryptionService.generateRandomBytes(32);

    const pinDerivedKey = EncryptionService.generatePinDerivedKey(PIN, salt);
    const encryptedRecoveryKey = EncryptionService.generateEncryptedRecoveryKey(
      recoveryKey,
      pinDerivedKey,
    );

    await firestore().collection('users').doc(userId).update({ salt, encryptedRecoveryKey });
    ToastService.success('Success', 'Pin created successfully');
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

const getEncryptedNote = async (note: string, recoveryKey: string) => {
  try {
    const encryptedNote = CryptoJS.AES.encrypt(note, recoveryKey).toString();
    return encryptedNote;
  } catch (error) {
    ToastService.error('Error', 'Something went wrong while encrypting your note');
  }
};

const getDecryptedNote = async (encryptedNote: string, recoveryKey: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedNote, recoveryKey);
    const decryptedNote = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedNote;
  } catch (error) {
    ToastService.error('Error', 'Something went wrong while decrypting your note');
  }
};

export const PINEncryptionService = { createPin, getEncryptedNote, getDecryptedNote };
