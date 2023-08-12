import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@jl/constants';
import { ConfirmPinCodeScreen, PinCodeScreen } from '@jl/screens';

export type SettingsStackParamList = {
  [Route.PinCode]: undefined;
  [Route.ConfirmPinCode]: undefined;
};

const Stack = createNativeStackNavigator();

export function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.PinCode} component={PinCodeScreen} />
      <Stack.Screen name={Route.ConfirmPinCode} component={ConfirmPinCodeScreen} />
    </Stack.Navigator>
  );
}
