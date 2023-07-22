import Toast from 'react-native-toast-message';

export abstract class ToastService {
  public static success(message: string, description: string) {
    Toast.show({
      type: 'success',
      text1: message,
      text2: description,
    });
  }

  public static error(message: string, description: string) {
    Toast.show({
      type: 'error',
      text1: `${message} ⚠️`,
      text2: description,
    });
  }

  public static info(message: string, description: string) {
    Toast.show({
      type: 'info',
      text1: message,
      text2: description,
    });
  }
}
