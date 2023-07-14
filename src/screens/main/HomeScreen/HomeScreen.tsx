import React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { TextVariant } from '@jl/constants';
import { FirebaseService } from '@jl/services';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { DocumentsList } from './components/DocumentsList';
import { FoldersList } from './components/FoldersList';

export function HomeScreen() {
  return (
    <BaseScreenLayout wrapWithScrollView={false}>
      <View style={tw`mx-5 pt-5 flex-1`}>
        <View style={tw`w-[200px]`}>
          <Text variant={TextVariant.Heading3Regular}>Welcome to Journey logs</Text>
          <Pressable style={tw`w-9 h-9 rounded bg-black`} onPress={() => FirebaseService.logOut()} />
        </View>
        <View style={tw`mt-12.75 flex-row items-center`}>
          <FoldersList />
        </View>
        <DocumentsList />
      </View>
    </BaseScreenLayout>
  );
}
