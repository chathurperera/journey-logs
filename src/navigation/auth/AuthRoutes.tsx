import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@jl/constants';
import { ForgetPasswordScreen, LoginScreen, SignupScreen } from '@jl/screens';

export type AuthStackParamList = {
  [Route.Login]: undefined;
  [Route.Signup]: undefined;
  [Route.ForgetPassword]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.Login} component={LoginScreen} />
      <Stack.Screen name={Route.ForgetPassword} component={ForgetPasswordScreen} />
      <Stack.Screen name={Route.Signup} component={SignupScreen} />
    </Stack.Navigator>
  );
}
