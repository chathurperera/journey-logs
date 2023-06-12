import { StatusBar, View, Text } from 'react-native';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

export function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <Text>Hello</Text>
      </View>
    </>
  );
}
export default App;
