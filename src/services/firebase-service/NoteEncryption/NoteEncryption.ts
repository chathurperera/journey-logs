import firestore from '@react-native-firebase/firestore';
import CryptoJS from 'crypto-js';

import { ToastService } from '../../toast-service/ToastService';

const savePinAndRecoveryKey = async (userId: string, salt: string, recoveryKey: string) => {
  try {
    await firestore().collection('users').doc(userId).update({ salt, recoveryKey });
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

export const NoteEncryption = { savePinAndRecoveryKey, getEncryptedNote, getDecryptedNote };
