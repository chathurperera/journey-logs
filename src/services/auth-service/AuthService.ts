import auth from '@react-native-firebase/auth';

import { FirebaseService } from '../firebase-service';

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
          console.log('email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.log(error);
      });
  }
}
