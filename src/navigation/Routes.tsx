import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import { Route } from '@jl/constants';
import { NavigationService } from '@jl/services';

import { AuthStack } from './auth';
import { MainStack } from './main';

const Stack = createNativeStackNavigator();

export function Routes() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
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
