import auth from '@react-native-firebase/auth';

import { Route } from '@jl/constants';
import { NavigationService, ToastService } from '@jl/services';

import { AccountService } from '../account';

const signUp = async ({ email, password, name }) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async userCredential => {
      await auth().currentUser.sendEmailVerification();
      const userId = userCredential.user.uid;
      console.log('new users id', userId);
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

const signIn = async ({ email, password }) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      NavigationService.navigate(Route.MainStack);
    })
    .catch(error => {
      console.log('error', error);
    });
};

const forgetPassword = async ({ email }) => {
  try {
    await auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        NavigationService.navigate(Route.Login);
      })
      .catch(error => {
        console.log('error', error);
      });
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

const logOut = async () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};

export const AuthService = { signUp, logOut, signIn, forgetPassword };
