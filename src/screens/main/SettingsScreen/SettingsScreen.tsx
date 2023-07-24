import { Icon } from '@rneui/base';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextAlignment, TextVariant } from '@jl/constants';
import { AuthService, NavigationService } from '@jl/services';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

interface SettingsScreenProps {
  testID: string;
}

export function SettingsScreen({ testID }: SettingsScreenProps) {
  return (
    <BaseScreenLayout testID={testID}>
      <View style={tw`mx-5 pt-5 flex-1`}>
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`w-10 h-10 rounded-full bg-blue-700 justify-center`}>
            <Text
              variant={TextVariant.Body2SemiBold}
              color={Color.Neutral.white}
              textAlign={TextAlignment.Center}>
              CP
            </Text>
          </View>
          <Text variant={TextVariant.Title2}>Settings</Text>
          <View></View>
        </View>

        <View style={tw`mt-10`}>
          <Pressable
            style={tw`bg-[${Color.Neutral.white}] rounded-t-lg p-4 gap-4 flex-row border-b-[${Color.Primary.Jl150}] border-b-2`}>
            <Icon type="feather" name="user" size={20} />
            <Text variant={TextVariant.Body2SemiBold}>Account</Text>
          </Pressable>
          <Pressable
            onPress={() => NavigationService.navigate(Route.Tags)}
            style={tw`bg-[${Color.Neutral.white}]  p-4 gap-4 flex-row border-b-[${Color.Primary.Jl150}] border-b-2`}>
            <Icon type="feather" name="tag" size={20} />
            <Text variant={TextVariant.Body2SemiBold}>Tags</Text>
          </Pressable>
          <Pressable
            style={tw`bg-[${Color.Neutral.white}]  p-4 gap-4 flex-row border-b-[${Color.Primary.Jl150}] border-b-2`}>
            <Icon type="feather" name="key" size={20} />
            <Text variant={TextVariant.Body2SemiBold}>Change Pin</Text>
          </Pressable>
          <Pressable
            style={tw`bg-[${Color.Neutral.white}]  p-4 gap-4 flex-row border-b-[${Color.Primary.Jl150}] border-b-2`}>
            <Icon type="feather" name="lock" size={20} />
            <Text variant={TextVariant.Body2SemiBold}>Change Password</Text>
          </Pressable>
          <Pressable
            style={tw`bg-[${Color.Neutral.white}] rounded-b-lg p-4 gap-4 flex-row`}
            onPress={() => AuthService.logOut()}>
            <Icon type="feather" name="log-out" size={20} />
            <Text variant={TextVariant.Body2SemiBold}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </BaseScreenLayout>
  );
}
