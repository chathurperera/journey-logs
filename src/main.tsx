/* eslint-disable @typescript-eslint/no-unused-vars */
import { getPersistor } from '@rematch/persist';
import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { useDeviceContext } from 'twrnc';

import { UnexpectedErrorScreen } from '@jl/screens';
import { initializeStore, store } from '@jl/stores';

import App from './app/App';
import { tw } from './config';

export default function Main() {
  useDeviceContext(tw);
  initializeStore();

  const errorHandler = (error: Error, stackTrace: string) => {
    //implement error logging
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={getPersistor()}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
    // <ErrorBoundary FallbackComponent={UnexpectedErrorScreen} onError={errorHandler}>
    // </ErrorBoundary>
  );
}
