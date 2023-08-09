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

const noteEncryption = async (noteId: string, note: string, userId: string) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then(async documentSnapshot => {
        if (documentSnapshot.exists) {
          const { recoveryKey } = documentSnapshot.data();
          const encryptedNote = await PINEncryptionService.getEncryptedNote(note, recoveryKey);

          //save the encrypted note back in database
          await firestore()
            .collection('notes')
            .doc(noteId)
            .update({ isEncrypted: true, body: encryptedNote });
        }
      })
      .catch(error => {
        console.log('error', error);
      });

    ToastService.success('Success', 'Your note is Locked 🔒');
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

const noteDecryption = async (noteId: string, encryptedNote: string, userId: string) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then(async documentSnapshot => {
        if (documentSnapshot.exists) {
          const { recoveryKey } = documentSnapshot.data();
          const decryptedNote = await PINEncryptionService.getDecryptedNote(
            encryptedNote,
            recoveryKey,
          );

          //save the decrypted note back in database
          await firestore()
            .collection('notes')
            .doc(noteId)
            .update({ isEncrypted: false, body: decryptedNote });
        }
      })
      .catch(error => {
        console.log('error', error);
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
