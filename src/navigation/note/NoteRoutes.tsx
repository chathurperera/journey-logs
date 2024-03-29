import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@jl/constants';
import { HiddenNotesScreen, NewNoteScreen, PreviewNoteScreen, TagsScreen } from '@jl/screens';

export type NotesStackParamList = {
  [Route.NewNoteTab]: undefined;
  [Route.PreviewNote]: {
    noteId: string;
  };
  [Route.Tags]: undefined;
  [Route.HiddenNotes]: undefined;
};

const Stack = createNativeStackNavigator();

export function NotesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.NewNoteTab} component={NewNoteScreen} />
      <Stack.Screen name={Route.PreviewNote} component={PreviewNoteScreen} />
      <Stack.Screen name={Route.Tags} component={TagsScreen} />
      <Stack.Screen name={Route.HiddenNotes} component={HiddenNotesScreen} />
    </Stack.Navigator>
  );
}
