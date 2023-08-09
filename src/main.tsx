import { getPersistor } from '@rematch/persist';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { useDeviceContext } from 'twrnc';

import { initializeStore } from '@jl/stores';
import { store } from '@jl/stores';

import App from './app/App';
import { tw } from './config';

export default function Main() {
  useDeviceContext(tw);
  initializeStore();

  return (
    <Provider store={store}>
      <PersistGate persistor={getPersistor()}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
