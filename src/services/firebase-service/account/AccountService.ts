import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { NewAccountParams, UpdateUserParams } from '@jl/models';

const createNewAccount = async ({ email, name, userId }: NewAccountParams) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .set({ email, name, salt: '', encryptedRecoveryKey: '', tags: [], securityPreference: 'Medium' });
  } catch (error) {
    console.log('error', error);
  }
};

const updateUserDetails = async (payload: UpdateUserParams, userId: string) => {
  try {
    await firestore().collection('users').doc(userId).set(payload);
  } catch (error) {
    console.log('error', error);
  }
};

const updateEmail = async (newEmail: string) => {
  try {
    const user = auth().currentUser;
    await user.updateEmail(newEmail);
  } catch (error) {
    console.error('Error updating email: ', error);
  }
};

const getMe = async (userId: string) => {
  try {
    const documentSnapshot = await firestore().collection('users').doc(userId).get();
    return documentSnapshot?.data();
  } catch (error) {}
};

export const AccountService = { createNewAccount, getMe, updateEmail, updateUserDetails };
