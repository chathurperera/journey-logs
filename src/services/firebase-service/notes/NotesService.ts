import firestore from '@react-native-firebase/firestore';

import { ToastService } from '../../toast-service';

interface NoteData {
  title: string;
  userId: string;
  body: string;
  isLocked?: boolean;
}

const createNote = async (noteData: NoteData) => {
  await firestore()
    .collection('notes')
    .add(noteData)
    .then(() => {
      ToastService.success('Success', 'Note saved successfully');
    })
    .catch(() => {
      ToastService.error('Error', 'Error while saving the note');
    });
};

export const NoteService = { createNote };
