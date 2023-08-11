import firestore from '@react-native-firebase/firestore';

import { NoteData } from '@jl/models';
import { getCurrentTimestamp } from '@jl/utils';

import { PINEncryptionService } from '../../firebase-service/PINEncryption';
import { ToastService } from '../../toast-service';

const createNote = async (noteData: NoteData) => {
  const currentTimestamp = getCurrentTimestamp();
  console.log('noteData userId', noteData.userId);
  try {
    await firestore()
      .collection('notes')
      .add({
        ...noteData,
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
        isEncrypted: false,
        categories: [],
      });

    console.log('note created');
  } catch (error) {
    console.log('error', error);
    ToastService.error('Error', 'Error while saving the note');
  }
};

const getAllNotes = async (userId: string) => {
  try {
    const querySnapshot = await firestore()
      .collection('notes')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();

    const data = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    })) as NoteData[];

    return data;
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
    throw error;
  }
};

const getSingleNote = async (noteId: string) => {
  try {
    const documentSnapshot = await firestore().collection('notes').doc(noteId).get();
    return documentSnapshot?.data();
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

const updateNote = async (
  noteId: string,
  payload: { title: string; body: string; userId: string },
) => {
  try {
    await firestore().collection('notes').doc(noteId).update(payload);
    ToastService.success('Success', 'Document updated successfully');
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

const noteEncryption = async (noteId: string, note: string, recoveryKey: string) => {
  try {
    const encryptedNote = await PINEncryptionService.getEncryptedNote(note, recoveryKey);

    await firestore()
      .collection('notes')
      .doc(noteId)
      .update({ isEncrypted: true, body: encryptedNote })
      .then(() => {
        console.log('note encrypted success');
      })
      .catch(() => {
        ToastService.error('Error', 'Something went wrong while encrypting your note');
      });

    ToastService.success('Success', 'Your note is Locked 🔒');
  } catch (error) {
    ToastService.error('Error', 'Something went wrong while encrypting your note');
  }
};

const noteDecryption = async (noteId: string, encryptedNote: string, recoveryKey: string) => {
  try {
    const decryptedNote = await PINEncryptionService.getDecryptedNote(encryptedNote, recoveryKey);

    await firestore()
      .collection('notes')
      .doc(noteId)
      .update({ isEncrypted: false, body: decryptedNote })
      .then(() => {
        ToastService.success('Success', 'Note successfully removed from hidden list');
      })
      .catch(() => {
        ToastService.error('Error', 'Something went wrong');
      });
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

const deleteNote = async noteId => {
  try {
    await firestore().collection('notes').doc(noteId).delete();
    ToastService.success('Success', 'Note deleted successfully 🎉');
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

export const NoteService = {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  noteDecryption,
  noteEncryption,
  updateNote,
};
