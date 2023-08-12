import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@jl/constants';
import { NavigationService } from '@jl/services';
import { useSelector } from '@jl/stores';

import { AuthStack } from './auth';
import { MainStack } from './main';

const Stack = createNativeStackNavigator();

export function Routes() {
  const { isAuthenticated, userData } = useSelector(state => state.userStore);

  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isAuthenticated && userData ? (
          <Stack.Group>
            <Stack.Screen name={Route.MainStack} component={MainStack} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name={Route.AuthStack} component={AuthStack} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
