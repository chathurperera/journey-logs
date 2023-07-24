module.exports = {
  displayName: 'journeyLogs',
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/src/config/test.config.ts'],
  transform: {
    '/node_modules/.+\\.(js|ts|tsx)$': './react-native-jest-preprocessor.js',
    '\\.(js|ts|tsx)$': './react-native-jest-preprocessor.js',
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': require.resolve('react-native/jest/assetFileTransformer.js'),
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@rneui)',
  ],
};
