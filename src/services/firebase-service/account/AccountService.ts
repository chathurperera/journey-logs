import firestore from '@react-native-firebase/firestore';

import { NewAccountParams } from '@jl/models';

const createNewAccount = async ({ email, name, userId }: NewAccountParams) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .set({ email, name })
    .then(() => {
      console.log('User added!');
    })
    .catch(error => {
      console.log('error', error);
    });
};

export const AccountService = { createNewAccount };
