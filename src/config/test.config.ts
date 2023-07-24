import '@testing-library/jest-native/extend-expect';

// jest.mock('@react-native-firebase/auth');

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-gesture-handler');

jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: jest.fn(() => 50), // Mock the useHeaderHeight hook
}));

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
  auth: jest.fn(() => ({
    currentUser: {
      email: 'test@example.com',
      uid: '123456',
    },
  })),
}));

jest.mock('@react-native-firebase/auth', () => ({
  auth: jest.fn().mockReturnValue({
    currentUser: {
      email: 'test@example.com',
      uid: '123456',
    },
  }),
}));
