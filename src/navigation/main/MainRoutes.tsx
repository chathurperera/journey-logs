import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@jl/constants';

import { MainBottomTabRoutes } from './MainBottomTabRoutes';

const Stack = createNativeStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
        headerBackVisible: false,
      }}>
      <Stack.Screen name={Route.MainBottomTabRoutesStack} component={MainBottomTabRoutes} />
    </Stack.Navigator>
  );
}