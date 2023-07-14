import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@jl/constants';
import { EditorScreen } from '@jl/screens';

export type EditorStackParamList = {
  [Route.EditorTab]: undefined;
};

const Stack = createNativeStackNavigator<EditorStackParamList>();

export function EditorStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.EditorTab} component={EditorScreen} />
    </Stack.Navigator>
  );
}
