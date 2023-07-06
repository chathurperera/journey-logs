import auth from '@react-native-firebase/auth';

import { FirebaseService } from '../firebase-service';
import { ToastService } from '../toast-service';

export class AuthService {
  static async signUp({ email, password, name }) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        console.log(' & signed in');
        await FirebaseService.createNewUser({ email, name });
        console.log('User account created');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          ToastService.error('Duplicate email', 'Email address already in use');
        }

        if (error.code === 'auth/invalid-email') {
          ToastService.error('Invalid Email', 'Please enter a correct email address');
        }

        console.log(error);
      });
  }
}
