import firestore from '@react-native-firebase/firestore';

import { NoteData } from '@jl/models';
import { getCurrentTimestampInSeconds } from '@jl/utils';

import { ToastService } from '../../toast-service';
import { NoteEncryption } from '../NoteEncryption';

const createNote = async (noteData: NoteData) => {
  const currentTimestamp = getCurrentTimestampInSeconds();
  try {
    await firestore()
      .collection('notes')
      .add({
        ...noteData,
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
        isEncrypted: false,
        isFavourite: false,
      });
  } catch (error) {
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
  }
};

const getAllNotesByMonth = async (startTimestamp: number, endTimestamp: number, userId: string) => {
  try {
    const documentSnapshot = await firestore()
      .collection('notes')
      .where('isEncrypted', '==', false)
      .where('userId', '==', userId)
      .where('createdAt', '>=', startTimestamp)
      .where('createdAt', '<', endTimestamp)
      .get();

    const data = documentSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    })) as NoteData[];

    return data;
  } catch (error) {
    console.log('error', error);
    ToastService.error('Error', 'Something went wrong');
  }
};

const getAllNotesByDay = async (startTimestamp: number, endTimestamp: number, userId: string) => {
  try {
    const documentSnapshot = await firestore()
      .collection('notes')
      .where('userId', '==', userId)
      .where('isEncrypted', '==', false)
      .where('createdAt', '>=', startTimestamp)
      .where('createdAt', '<=', endTimestamp)
      .get();

    const data = documentSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    })) as NoteData[];
    console.log('data', data);

    return data;
  } catch (error) {
    console.log('error', error);
    ToastService.error('Error', 'Something went wrong');
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

const updateNote = async (noteId: string, payload: { title: string; body: string; userId: string; tags: string[] }) => {
  try {
    await firestore().collection('notes').doc(noteId).update(payload);
    ToastService.success('Success', 'Document updated successfully');
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

const noteEncryption = async (noteId: string, note: string, recoveryKey: string) => {
  try {
    const encryptedNote = await NoteEncryption.getEncryptedNote(note, recoveryKey);
    await firestore()
      .collection('notes')
      .doc(noteId)
      .update({ isEncrypted: true, body: encryptedNote })
      .then(() => {
        ToastService.success('Success', 'Your note is Locked 🔒');
      })
      .catch(() => {
        ToastService.error('Error', 'Something went wrong while encrypting your note');
      });
  } catch (error) {
    ToastService.error('Error', 'Something went wrong while encrypting your note');
  }
};

const noteDecryption = async (noteId: string, encryptedNote: string, recoveryKey: string) => {
  try {
    const decryptedNote = await NoteEncryption.getDecryptedNote(encryptedNote, recoveryKey);

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

const deleteNote = async (noteId: string) => {
  try {
    await firestore().collection('notes').doc(noteId).delete();
    ToastService.success('Success', 'Note deleted successfully 🎉');
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

const getFavourites = async (userId: string) => {
  try {
    const querySnapshot = await firestore()
      .collection('notes')
      .where('userId', '==', userId)
      .where('isEncrypted', '==', false)
      .where('isFavourite', '==', true)
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
  }
};

const addToFavourites = async (noteId: string) => {
  try {
    await firestore().collection('notes').doc(noteId).update({ isFavourite: true });
    ToastService.success('Success', 'Note added to favourites');
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

const removeFromFavourites = async (noteId: string) => {
  try {
    await firestore().collection('notes').doc(noteId).update({ isFavourite: false });
    ToastService.success('Success', 'Note removed from favourites');
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

export const NoteService = {
  addToFavourites,
  removeFromFavourites,
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  noteDecryption,
  getFavourites,
  noteEncryption,
  getAllNotesByMonth,
  getAllNotesByDay,
  updateNote,
};
