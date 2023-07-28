import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
      <StatusBar barStyle="dark-content" />
      <GestureHandlerRootView style={tw`flex-1`}>
        <View style={tw`flex-1`}>
          <Routes />
        </View>
        <ToastAlert />
      </GestureHandlerRootView>
    </>
  );
}
export default App;
