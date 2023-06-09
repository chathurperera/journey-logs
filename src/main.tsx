import { View, Text } from 'react-native';
import React from 'react';
import App from './app/App';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Main() {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
}
