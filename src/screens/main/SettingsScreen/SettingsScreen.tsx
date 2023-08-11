import { Icon } from '@rneui/base';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextAlignment, TextVariant } from '@jl/constants';
import { NavigationService } from '@jl/services';
import { useDispatch } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

interface SettingsScreenProps {
  testID: string;
}

export function SettingsScreen({ testID }: SettingsScreenProps) {
  const dispatch = useDispatch();

  return (
    <BaseScreenLayout testID={testID}>
      <View style={tw`mx-5 pt-5 flex-1`}>
        <View style={tw`flex-row justify-center items-center relative`}>
          <View style={tw`w-10 h-10 rounded-full bg-blue-700 justify-center absolute left-0`}>
            <Text
              variant={TextVariant.Body2SemiBold}
              color={Color.Neutral.white}
              textAlign={TextAlignment.Center}>
              CP
            </Text>
          </View>
          <Text variant={TextVariant.Title2} textAlign={TextAlignment.Center}>
            Settings
          </Text>
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
            onPress={() => NavigationService.navigate(Route.PinCode, { pinExists: true })}
            style={tw`bg-[${Color.Neutral.white}]  p-4 gap-4 flex-row border-b-[${Color.Primary.Jl150}] border-b-2`}>
            <Icon type="feather" name="key" size={20} />
            <Text variant={TextVariant.Body2SemiBold}>Change Pin</Text>
          </Pressable>
          <Pressable
            onPress={() => NavigationService.navigate(Route.HiddenNotes)}
            style={tw`bg-[${Color.Neutral.white}]  p-4 gap-4 flex-row border-b-[${Color.Primary.Jl150}] border-b-2`}>
            <Icon type="feather" name="key" size={20} />
            <Text variant={TextVariant.Body2SemiBold}>Hidden notes</Text>
          </Pressable>
          <Pressable
            style={tw`bg-[${Color.Neutral.white}]  p-4 gap-4 flex-row border-b-[${Color.Primary.Jl150}] border-b-2`}>
            <Icon type="feather" name="lock" size={20} />
            <Text variant={TextVariant.Body2SemiBold}>Change Password</Text>
          </Pressable>
          <Pressable
            style={tw`bg-[${Color.Neutral.white}] rounded-b-lg p-4 gap-4 flex-row`}
            onPress={() => dispatch.userStore.logoutUser()}>
            <Icon type="feather" name="log-out" size={20} />
            <Text variant={TextVariant.Body2SemiBold}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </BaseScreenLayout>
  );
}
