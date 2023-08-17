import firestore from '@react-native-firebase/firestore';

import { NewAccountParams } from '@jl/models';

const createNewAccount = async ({ email, name, userId }: NewAccountParams) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .set({ email, name, salt: '', encryptedRecoveryKey: '', tags: [] });
  } catch (error) {
    console.log('error', error);
  }
};

const getMe = async (userId: string) => {
  try {
    const documentSnapshot = await firestore().collection('users').doc(userId).get();
    return documentSnapshot?.data();
  } catch (error) {}
};

export const AccountService = { createNewAccount, getMe };
