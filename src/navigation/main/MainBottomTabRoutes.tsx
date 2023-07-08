import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import React from 'react';

import { Route } from '@jl/constants';
import { HomeScreen } from '@jl/screens';

const Tab = createBottomTabNavigator();

export function MainBottomTabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={Route.HomeTab}
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => <Icon type="feather" name="home" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
