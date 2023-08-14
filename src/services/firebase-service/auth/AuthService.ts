import auth from '@react-native-firebase/auth';

import { Route } from '@jl/constants';
import { LoginData, SignupData } from '@jl/models';
import { NavigationService, ToastService } from '@jl/services';

const signUp = async ({ email, password }: SignupData) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(email, password);
    return response.user;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      ToastService.error('Duplicate email', 'Email address already in use');
    } else if (error.code === 'auth/invalid-email') {
      ToastService.error('Invalid Email', 'Please enter a correct email address');
    } else if (error.code === 'auth/weak-password') {
      ToastService.error('Weak Password', 'Please use a strong password');
    } else {
      ToastService.error('Error', 'Something went wrong');
    }
  }
};

const signIn = async ({ email, password }: LoginData) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);

    return response.user;
  } catch (error) {
    if (error.code === 'auth/user-disabled') {
      ToastService.error('Email disabled', 'Email address has been disabled');
    } else if (error.code === 'auth/invalid-email') {
      ToastService.error('Invalid Email', 'Please enter a correct email address');
    } else if (error.code === 'auth/user-not-found') {
      ToastService.error('No Account', 'User doesnt exists');
    } else if (error.code === 'auth/wrong-password') {
      ToastService.error('Unauthorized', 'invalid credentials');
    } else {
      ToastService.error('Error', 'Something went wrong');
    }
  }
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
  try {
    auth().signOut();
  } catch (error) {
    console.log('error', error);
  }
};

export const AuthService = { signUp, logOut, signIn, forgetPassword };
