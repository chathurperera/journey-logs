/* eslint-disable react-native/no-inline-styles */
import { StatusBar, View, Text } from 'react-native';
import React from 'react';

export function App() {
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
