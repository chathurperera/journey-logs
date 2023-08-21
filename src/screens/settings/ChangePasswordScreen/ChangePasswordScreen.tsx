import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, PasswordField, Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';
import { HeaderBackButton } from '@jl/navigation';
import { AccountService } from '@jl/services';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { ChangePasswordFormValues, changePasswordValidationSchema } from './ChangePassword.validations';

export function ChangePasswordScreen() {
  const { handleSubmit, control } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordValidationSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async formData => {
    const { currentPassword, newPassword } = formData;

    setIsLoading(true);
    try {
      await AccountService.updatePassword(currentPassword, newPassword);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <BaseScreenLayout>
      <View style={tw`mx-5 h-full pb-10`}>
        <View style={tw`justify-between flex-row items-center mb-3 relative`}>
          <HeaderBackButton />
          <View style={tw`w-full absolute left-0 right-0`}>
            <Text variant={TextVariant.Heading3SemiBold} color={Color.Neutral.JL900} textAlign={TextAlignment.Center}>
              Change Password
            </Text>
          </View>
        </View>
        <View style={tw`mt-6`}>
          <View style={tw`mb-2 `}>
            <PasswordField label="Current Password" control={control} name="currentPassword" />
          </View>
          <View style={tw`mb-2 `}>
            <PasswordField label="New Password" control={control} name="newPassword" />
          </View>
          <View style={tw`mt-3`}>
            <Button
              title={'Update Password'}
              onPress={handleSubmit(handleOnSubmit)}
              loading={isLoading}
              containerStyle={tw`w-full`}
            />
          </View>
        </View>
      </View>
    </BaseScreenLayout>
  );
}
