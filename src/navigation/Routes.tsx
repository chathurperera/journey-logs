import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import { Route } from '@jl/constants';
import { NavigationService } from '@jl/services';
import { useDispatch, useSelector } from '@jl/stores';

import { AuthStack } from './auth';
import { MainStack } from './main';

const Stack = createNativeStackNavigator();

export function Routes() {
  const { isAuthenticated } = useSelector(state => state.userStore);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    setLoading(true);
    setUser(user);
    if (!user) {
      dispatch.userStore.resetToInitialState();
      dispatch.encryptionStore.resetToInitialState();
    }
    setLoading(false);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing || loading) return null;

  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user && isAuthenticated ? (
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
