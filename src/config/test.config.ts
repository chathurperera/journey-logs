import '@testing-library/jest-native/extend-expect';

import { initializeStore } from '@jl/stores';

initializeStore();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => {},
  useSelector: () => ({
    userStore: {
      userData: {
        userId: 'testId',
      },
    },
  }),
}));

jest.mock('@react-native-voice/voice', () => ({
  start: jest.fn(),
  stop: jest.fn(),
  destroy: jest.fn(),
  removeAllListeners: jest.fn(),
  onSpeechResults: jest.fn(),
  onSpeechStart: null,
  onSpeechEnd: null,
  onSpeechError: null,
  onSpeechRecognized: null,
}));

jest.mock('lottie-react-native', () => {
  const LottieMock = jest.fn(() => null); // This returns a null rendering component.
  LottieMock.prototype.play = jest.fn();
  LottieMock.prototype.pause = jest.fn();
  return LottieMock;
});

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-gesture-handler');

jest.mock('react-native-pell-rich-editor');

jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: jest.fn(() => 50), // Mock the useHeaderHeight hook
}));

jest.mock('react-native-quick-crypto', () => ({
  randomBytes: jest.fn(() => Promise.resolve(Buffer.from('1234567890123456'))),
  pbkdf2: jest.fn(() => Promise.resolve(Buffer.from('12345678901234567890123456789012'))),
}));

jest.mock('@react-native-async-storage/async-storage', () => {
  const asyncStorage = jest.requireActual('@react-native-async-storage/async-storage/jest/async-storage-mock');
  // jest.requireActual('./../services/persistent-storage-service');
  return asyncStorage;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('@react-navigation/native', () => {
  const navigation = jest.requireActual('@react-navigation/native');

  return {
    ...navigation,
    useNavigation: () => ({
      getParent: jest.fn(),
      setOptions: jest.fn(),
    }),
    useRoute: () => ({}),
  };
});

jest.mock('@react-native-firebase/auth', () => ({
  auth: jest.fn().mockReturnValue({
    currentUser: {
      email: 'test@example.com',
      uid: '123456',
    },
  }),
}));

jest.mock('react-native-webview', () => ({
  default: () => jest.fn(),
}));
