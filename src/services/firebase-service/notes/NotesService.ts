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
        isLocked: false,
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
    throw error; // Rethrow the error or handle it appropriately.
  }
};

export const NoteService = { createNote, getAllNotes };
