import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Route } from '@jl/constants';
import { CalendarScreen, EditorScreen, HomeScreen, SearchScreen, SettingsScreen } from '@jl/screens';

import { CustomBottomTabBar } from './components/CustomBottomTabBar';

const Tab = createBottomTabNavigator();

export function MainBottomTabRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <CustomBottomTabBar {...props} />}>
      <Tab.Screen name={Route.HomeTab} component={HomeScreen} />
      <Tab.Screen name={Route.CalendarTab} component={CalendarScreen} />
      <Tab.Screen name={Route.EditorTab} component={EditorScreen} />
      <Tab.Screen name={Route.SearchTab} component={SearchScreen} />
      <Tab.Screen name={Route.SettingsTab} component={SettingsScreen} />
    </Tab.Navigator>
  );
}
