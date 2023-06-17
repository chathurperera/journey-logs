import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@jl/constants';
import { LoginScreen } from '@jl/screens';

export type AuthStackParamList = {
  [Route.Login]: undefined;
  [Route.Signup]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.Login} component={LoginScreen} />
    </Stack.Navigator>
  );
}
