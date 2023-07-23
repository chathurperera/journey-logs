import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, Text, TextField } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextVariant } from '@jl/constants';
import { AuthService, NavigationService } from '@jl/services';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import {
  ForgetPasswordFormValues,
  ForgetPasswordValidationSchema,
} from './ForgetPassword.validations';

export function ForgetPasswordScreen() {
  const { handleSubmit, control } = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(ForgetPasswordValidationSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async formData => {
    setIsLoading(true);
    await AuthService.forgetPassword(formData);
    setIsLoading(false);
  };

  return (
    <BaseScreenLayout>
      <View style={tw`flex-1 justify-between mt-10 mx-5`}>
        <View>
          <View style={tw`w-[210px] mb-2`}>
            <Text variant={TextVariant.Heading1Regular} color={Color.Neutral.JL900}>
              Forgot Password ?
            </Text>
          </View>
          <Text variant={TextVariant.Body1Regular} color={Color.Neutral.JL300}>
            No worries, we'll send you reset instructions
          </Text>
          <View style={tw`mb-4 mt-10`}>
            <TextField control={control} label="Email" name="email" />
          </View>
          <Button
            title="Send instructions"
            onPress={handleSubmit(handleOnSubmit)}
            loading={isLoading}
          />
        </View>
        <View style={tw`gap-1 justify-center flex-row`}>
          <Text
            variant={TextVariant.Link}
            color={Color.Primary.Jl400}
            onPress={() => NavigationService.navigate(Route.Login)}>
            Back to Login
          </Text>
        </View>
      </View>
    </BaseScreenLayout>
  );
}
