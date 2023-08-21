import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
import SplashScreen from 'react-native-splash-screen';

import { ToastAlert } from '@jl/components';
import { tw } from '@jl/config';
import { Routes } from '@jl/navigation';

export function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <GestureHandlerRootView style={tw`flex-1`}>
        <StatusBar barStyle="dark-content" />
        <View style={tw`flex-1`}>
          <Host>
            <Routes />
          </Host>
        </View>
        <ToastAlert />
      </GestureHandlerRootView>
    </>
  );
}
export default App;
