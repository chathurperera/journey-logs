import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@jl/constants';
import {
  AccountScreen,
  ChangePasswordScreen,
  ChangePinCodeScreen,
  ConfirmPinCodeScreen,
  MaxPinCodeAttemptsReachedScreen,
  OldPinVerificationScreen,
  PinCodeScreen,
} from '@jl/screens';

export type SettingsStackParamList = {
  [Route.PinCode]: undefined;
  [Route.Account]: undefined;
  [Route.ConfirmPinCode]: undefined;
  [Route.OldPINVerification]: undefined;
  [Route.ChangePinCode]: undefined;
  [Route.MaxPinCodeAttemptsReached]: undefined;
};

const Stack = createNativeStackNavigator();

export function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={Route.PinCode} component={PinCodeScreen} />
      <Stack.Screen name={Route.ConfirmPinCode} component={ConfirmPinCodeScreen} />
      <Stack.Screen name={Route.Account} component={AccountScreen} />
      <Stack.Screen name={Route.OldPINVerification} component={OldPinVerificationScreen} />
      <Stack.Screen name={Route.ChangePinCode} component={ChangePinCodeScreen} />
      <Stack.Screen name={Route.MaxPinCodeAttemptsReached} component={MaxPinCodeAttemptsReachedScreen} />
      <Stack.Screen name={Route.ChangePassword} component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}
