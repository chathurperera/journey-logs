import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDeviceContext } from 'twrnc';

import App from './app/App';
import { tw } from './config';

export default function Main() {
  useDeviceContext(tw);

  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
}
