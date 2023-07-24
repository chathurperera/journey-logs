import React from 'react';
import { View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { TextVariant } from '@jl/constants';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { CategoriesList } from './components/CategoriesList';
import { NotesList } from './components/NotesList';

export function HomeScreen() {
  return (
    <BaseScreenLayout wrapWithScrollView={false}>
      <View style={tw`mx-5 pt-5 flex-1`}>
        <View style={tw`w-[200px]`}>
          <Text variant={TextVariant.Heading3Regular}>Welcome to Journey logs</Text>
        </View>
        <View style={tw`mt-12.75 flex-row items-center`}>
          <CategoriesList />
        </View>
        <NotesList />
      </View>
    </BaseScreenLayout>
  );
}
