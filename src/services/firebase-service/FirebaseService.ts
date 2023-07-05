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
}
