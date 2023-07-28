import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@jl/constants';
import { EditNoteScreen, NewNoteScreen, PreviewNoteScreen, TagsScreen } from '@jl/screens';

export type NotesStackParamList = {
  [Route.NewNoteTab]: undefined;
  [Route.PreviewNote]: {
    noteId: string;
  };
  [Route.EditNote]: undefined;
  [Route.Tags]: undefined;
};

const Stack = createNativeStackNavigator();

export function NotesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.NewNoteTab} component={NewNoteScreen} />
      <Stack.Screen name={Route.EditNote} component={EditNoteScreen} />
      <Stack.Screen name={Route.PreviewNote} component={PreviewNoteScreen} />
      <Stack.Screen name={Route.Tags} component={TagsScreen} />
    </Stack.Navigator>
  );
}
