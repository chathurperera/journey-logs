import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { NewAccountParams, UpdateUserParams, UserData } from '@jl/models';

import { ToastService } from '../../toast-service/ToastService';

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

const updateEmail = async (newEmail: string): Promise<void> => {
  try {
    const user = auth().currentUser;
    await user.updateEmail(newEmail);
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

const getMe = async (userId: string): Promise<UserData | undefined> => {
  try {
    const documentSnapshot = await firestore().collection('users').doc(userId).get();

    // Assert the data type when fetching from Firestore.
    return documentSnapshot.data() as UserData;
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
    return undefined;
  }
};

const updatePassword = async (currentPassword: string, newPassword: string) => {
  try {
    const user = auth().currentUser;
    if (user) {
      const credentials = auth.EmailAuthProvider.credential(user.email, currentPassword);

      // Re-authenticate user
      user
        .reauthenticateWithCredential(credentials)
        .then(() => {
          user
            .updatePassword(newPassword)
            .then(() => {
              ToastService.success('success', 'Password changed successfully');
            })
            .catch(() => {
              ToastService.error('Error', 'Something went wrong');
            });
        })
        .catch(() => {
          ToastService.error('Error', 'Incorrect current password');
        });
    }
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

export const AccountService = { createNewAccount, getMe, updateEmail, updateUserDetails, updatePassword };
