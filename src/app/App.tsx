import { StatusBar, View } from 'react-native';
import React, { useEffect } from 'react';
import { Button } from '@rneui/base';
import SplashScreen from 'react-native-splash-screen';

export function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, padding: 80 }}>
        <Button title="hello world" onPress={() => console.log('clicked')} />
      </View>
    </>
  );
}
export default App;
