import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

import { ToastAlert } from '@jl/components';
import { Routes } from '@jl/navigation';

export function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <GestureHandlerRootView className="flex-1">
        <View className="flex-1">
          <Routes />
        </View>
        <ToastAlert />
      </GestureHandlerRootView>
    </>
  );
}
export default App;
