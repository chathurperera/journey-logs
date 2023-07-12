module.exports = {
  displayName: 'journeyLogs',
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
