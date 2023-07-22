import auth from '@react-native-firebase/auth';

import { ToastService } from '@jl/services';

import { AccountService } from '../account';

const signUp = async ({ email, password, name }) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async userCredential => {
      await auth().currentUser.sendEmailVerification();
      const userId = userCredential.user.uid;

      await AccountService.createNewAccount({ email, name, userId });
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        ToastService.error('Duplicate email', 'Email address already in use');
      }

      if (error.code === 'auth/invalid-email') {
        ToastService.error('Invalid Email', 'Please enter a correct email address');
      }
    });
};

const logOut = async () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};

export const AuthService = { signUp, logOut };
