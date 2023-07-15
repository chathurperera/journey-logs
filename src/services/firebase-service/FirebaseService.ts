import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export class FirebaseService {
  static async createNewUser(userData) {
    firestore()
      .collection('users')
      .add(userData)
      .then(() => {
        console.log('User added!');
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  static async logOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
}
