import { Chip } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, SECURITY_LEVELS, TextAlignment, TextVariant } from '@jl/constants';
import { useFetch } from '@jl/hooks';
import { HeaderBackButton } from '@jl/navigation';
import { AccountService, ToastService } from '@jl/services';
import { useDispatch, useSelector } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

export function AccountScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Medium');

  const dispatch = useDispatch();
  const { userId } = useSelector(state => state.userStore.userData);
  const { data } = useFetch(() => AccountService.getMe(userId));

  useEffect(() => {
    if (data) {
      setName(data.name);
      setSelectedOption(data.securityPreference);
      setEmail(data.email);
    }
  }, [data]);

  const renderSecurityLevelOptions = SECURITY_LEVELS.map(level => (
    <Chip
      key={level}
      onPress={() => isEditing && setSelectedOption(level)}
      type={level === selectedOption ? 'solid' : 'outline'}
      title={level}
      buttonStyle={tw`bg-[${level === selectedOption ? Color.Primary.Jl500 : Color.Neutral.white}] border-[${
        Color.Neutral.black
      }]`}
      titleStyle={tw`text-[${level === selectedOption ? Color.Neutral.white : Color.Neutral.black}]`}
    />
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
      await AccountService.updateEmail(email);
      await AccountService.updateUserDetails({ email, name, securityPreference: selectedOption }, userId);
      ToastService.success('Success', 'Account Details updated');
      dispatch.userStore.setUserData({ userId, email, name });
      setIsEditing(false);
    }
  };

  return (
    <BaseScreenLayout>
      <View style={tw`mx-5 h-full pb-10`}>
        <View style={tw`justify-between flex-row items-center mb-3 relative`}>
          <HeaderBackButton />
          <View style={tw`mx-auto absolute left-0 right-0`}>
            <Text variant={TextVariant.Heading3SemiBold} color={Color.Neutral.JL900} textAlign={TextAlignment.Center}>
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
          <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL800}>
            Name
          </Text>
          <View style={tw`bg-[${Color.Neutral.JL50}] mb-2 rounded-md h-12 mt-1.5`}>
            <TextInput style={tw`flex-1 px-4`} value={name} onChangeText={setName} editable={isEditing} />
          </View>

          <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL800}>
            Email
          </Text>
          <View style={tw`bg-[${Color.Neutral.JL50}] mb-2 rounded-md h-12 mt-1.5`}>
            <TextInput style={tw`flex-1 px-4`} value={email} onChangeText={setEmail} editable={isEditing} />
          </View>
          <View style={tw`mt-3 w-80`}>
            <Text variant={TextVariant.Body2SemiBold} color={Color.Neutral.JL800}>
              Security Preference
            </Text>
            <Text variant={TextVariant.Body1Regular} color={Color.Neutral.JL500}>
              Choose the option that aligns with your desired security level.
            </Text>
            <View style={tw`mt-3 flex-row gap-2`}>{renderSecurityLevelOptions}</View>
          </View>
        </View>
      </View>
    </BaseScreenLayout>
  );
}
