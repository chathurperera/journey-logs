import firestore from '@react-native-firebase/firestore';

import { NewAccountParams } from '@jl/models';

const createNewAccount = async ({ email, name, userId }: NewAccountParams) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .set({ email, name, salt: '', recoveryKey: '' })
    .then(() => {
      console.log('User added!');
    })
    .catch(error => {
      console.log('error', error);
    });
};

const getMe = async (userId: string) => {
  try {
    const documentSnapshot = await firestore().collection('users').doc(userId).get();
    return documentSnapshot?.data();
  } catch (error) {}
};

export const AccountService = { createNewAccount, getMe };
