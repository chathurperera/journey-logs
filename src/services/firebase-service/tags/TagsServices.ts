import firestore from '@react-native-firebase/firestore';

import { ToastService } from '../../toast-service';

const createTag = async (userId: string, tag: string) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .update({ tags: firestore.FieldValue.arrayUnion(tag) });
  } catch (error) {
    console.log('error', error);
    ToastService.error('Error', 'Something went wrong');
  }
};

const getAllTags = async (userId: string) => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();
    return userData.tags;
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

const removeUserTagAndUpdateNotes = async (userId: string, tagToRemove: string) => {
  try {
    const batch = firestore().batch();
    const userRef = firestore().collection('users').doc(userId);
    const notesRef = firestore().collection('notes');

    batch.update(userRef, {
      tags: firestore.FieldValue.arrayRemove(tagToRemove),
    });

    // Fetch all notes that contain the tag to be removed
    const notesSnapshot = await notesRef.where('tags', 'array-contains', tagToRemove).get();

    // Loop through all found notes and schedule each update
    notesSnapshot.forEach(noteDoc => {
      const noteRef = notesRef.doc(noteDoc.id);
      batch.update(noteRef, {
        tags: firestore.FieldValue.arrayRemove(tagToRemove),
      });
    });

    // Commit the batch to execute all scheduled operations
    await batch.commit();
  } catch (error) {
    console.log('error', error);
    ToastService.error('Error', 'Something went wrong');
  }
};

export const TagsService = { createTag, getAllTags, removeUserTagAndUpdateNotes };
