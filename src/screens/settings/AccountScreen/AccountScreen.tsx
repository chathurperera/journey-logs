import { CheckBox, Input } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import {
  Color,
  SECURITY_LEVELS,
  SECURITY_LEVEL_OPTIONS,
  TextAlignment,
  TextVariant,
} from '@jl/constants';
import { useFetch } from '@jl/hooks';
import { UserData } from '@jl/models';
import { HeaderBackButton } from '@jl/navigation';
import { AccountService, ToastService } from '@jl/services';
import { useDispatch, useSelector } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

type SecurityLevel = (typeof SECURITY_LEVELS)[number];

interface AccountScreenProps {
  testID?: string;
}

const labelComponent = label => (
  <View style={tw`pb-1`}>
    <Text variant={TextVariant.Label1Regular} color={Color.Neutral.black}>
      {label}
    </Text>
  </View>
);

export function AccountScreen({ testID }: AccountScreenProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<SecurityLevel>('Medium');

  const dispatch = useDispatch();
  const { userId } = useSelector(state => state.userStore.userData);
  const { data } = useFetch<UserData>(() => AccountService.getMe(userId));

  useEffect(() => {
    if (data) {
      setName(data.name);
      setSelectedOption(data.securityPreference);
      setEmail(data.email);
    }
  }, [data]);

  const securityPreferenceSelection = level => {
    if (isEditing) {
      setSelectedOption(level);
    }
  };

  const renderSecurityLevelOptions = SECURITY_LEVEL_OPTIONS.map(option => (
    <Pressable
      key={option.level}
      onPress={() => securityPreferenceSelection(option.level)}
      style={tw`border-2 border-[${
        selectedOption === option.level ? Color.Secondary.JL500 : Color.Neutral.JL100
      }]  rounded-md px-4 pl-14 py-3 flex-row items-start gap-4`}>
      <View style={tw`absolute `}>
        <CheckBox
          checked={selectedOption === option.level}
          style={tw`absolute`}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Color.Secondary.JL500}
        />
      </View>
      <View style={tw`w-80`}>
        <Text variant={TextVariant.Body2SemiBold} color={Color.Neutral.JL800}>
          {option.title}
        </Text>
        <Text variant={TextVariant.Body1Regular} color={Color.Neutral.JL300}>
          {option.description}
        </Text>
      </View>
    </Pressable>
  ));

  const handleAccountUpdate = async () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      if (email === '') {
        ToastService.error('Error', 'Email cannot be empty');
        return;
      }
      if (name === '') {
        ToastService.error('Error', 'Name cannot be empty');
        return;
      }

      try {
        await AccountService.updateEmail(email);
        await AccountService.updateUserDetails(
          { email, name, securityPreference: selectedOption },
          userId,
        );
        ToastService.success('Success', 'Account Details updated');

        dispatch.userStore.setUserData({ userId, email, name });
        setIsEditing(false);
      } catch (error) {
        ToastService.error('Error', error.message || 'Error updating account details.');
        setIsEditing(false);
      }
    }
  };

  return (
    <BaseScreenLayout testID={testID}>
      <View style={tw`mx-5 h-full pb-10`}>
        <View style={tw`justify-between flex-row items-center mb-3 relative`}>
          <HeaderBackButton />
          <View style={tw`mx-auto absolute left-0 right-0`}>
            <Text
              variant={TextVariant.Heading3SemiBold}
              color={Color.Neutral.JL900}
              textAlign={TextAlignment.Center}>
              Account
            </Text>
          </View>
          <Text
            onPress={handleAccountUpdate}
            variant={TextVariant.Heading3SemiBold}
            color={Color.Primary.Jl500}
            textAlign={TextAlignment.Center}>
            {isEditing ? 'DONE' : 'EDIT'}
          </Text>
        </View>
        <View style={tw`mt-6`}>
          <Input
            containerStyle={tw`px-0`}
            autoCapitalize={'none'}
            style={tw`flex-1 px-4`}
            value={name}
            label={labelComponent('Name')}
            inputStyle={tw`px-2.5 text-[15px] font-Inter`}
            inputContainerStyle={tw`border-[${Color.Tertiary.jl100}] border-[1px] rounded-2 py-1`}
            onChangeText={setName}
            editable={isEditing}
          />
          <Input
            containerStyle={tw`px-0`}
            autoCapitalize={'none'}
            style={tw`flex-1 px-4`}
            value={email}
            label={labelComponent('Email')}
            inputStyle={tw`px-2.5 text-[15px] font-Inter`}
            inputContainerStyle={tw`border-[${Color.Tertiary.jl100}] border-[1px] rounded-2 py-1`}
            onChangeText={setName}
            editable={isEditing}
          />
          <View style={tw`mt-3 w-80`}>
            <Text variant={TextVariant.Body2SemiBold} color={Color.Neutral.JL800}>
              Security Preference
            </Text>
            <Text variant={TextVariant.Body1Regular} color={Color.Neutral.JL500}>
              Choose the option that aligns with your desired security level.
            </Text>
          </View>
          <View style={tw`mt-3 gap-2`}>{renderSecurityLevelOptions}</View>
        </View>
      </View>
    </BaseScreenLayout>
  );
}
