import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { NoteData } from '@jl/models';
import { getCurrentTimestamp } from '@jl/utils';

import { ToastService } from '../../toast-service';

const userId = auth().currentUser?.uid;

const createNote = async (noteData: NoteData) => {
  const currentTimestamp = getCurrentTimestamp();

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
  } catch (error) {
    ToastService.error('Error', 'Error while saving the note');
  }
};

const getAllNotes = async () => {
  try {
    const querySnapshot = await firestore()
      .collection('notes')
      .where('userId', '==', userId)
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

const getSingleNote = async noteId => {
  try {
    const documentSnapshot = await firestore().collection('notes').doc(noteId).get();
    return documentSnapshot?.data();
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

const updateNote = async (noteId, payload) => {
  try {
    await firestore().collection('notes').doc(noteId).update(payload);
    ToastService.success('Success', 'Document updated successfully');
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

const noteEncryption = async (noteId, encrypt) => {
  try {
    await firestore().collection('notes').doc(noteId).update({ isEncrypted: encrypt });
    ToastService.success('Success', `Your note is ${encrypt ? 'locked' : 'unlocked'} now`);
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

export const NoteService = { createNote, getAllNotes, getSingleNote, updateNote, noteEncryption };
