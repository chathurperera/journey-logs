import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, View } from 'react-native';

import { images } from '@jl/assets';
import { Button, PasswordField, Text, TextField } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextVariant } from '@jl/constants';
import { NavigationService } from '@jl/services';
import { useDispatch } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { LoginFormValues, loginValidationSchema } from './Login.validations';

interface LoginScreenProps {
  testID?: string;
}

export function LoginScreen({ testID }: LoginScreenProps) {
  const { handleSubmit, control } = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleOnSubmit = async formData => {
    try {
      setIsLoading(true);
      await dispatch.userStore.login(formData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <BaseScreenLayout testID={testID}>
      <View style={tw`flex-1 justify-between mt-10 mx-5`} testID={testID}>
        <View style={tw`pt-8`}>
          <Image source={images.logo} style={tw`w-14 h-14`} />
          <View style={tw`mt-6 mb-10`}>
            <Text variant={TextVariant.Heading3Regular} color={Color.Neutral.JL900}>
              Great to see you again!
            </Text>
            <Text variant={TextVariant.Body1Regular} color={Color.Neutral.JL500}>
              Enter your details to continue.
            </Text>
          </View>
          <View style={tw`mb-10`}>
            <View style={tw`mb-2`}>
              <TextField control={control} label="Email" name="email" />
            </View>
            <View style={tw`mb-3`}>
              <PasswordField control={control} label="Password" name="password" />
            </View>
            <Text
              variant={TextVariant.Link}
              color={Color.Primary.Jl700}
              onPress={() => NavigationService.navigate(Route.ForgetPassword)}>
              Forgot password ?
            </Text>
          </View>
          <Button title="Login" onPress={handleSubmit(handleOnSubmit)} loading={isLoading} />
        </View>
        <View style={tw`gap-1 justify-center flex-row`}>
          <Text variant={TextVariant.Body1Regular}>New to Journey Logs? </Text>
          <Text
            variant={TextVariant.Link}
            color={Color.Primary.Jl400}
            onPress={() => NavigationService.navigate(Route.Signup)}>
            Sign up
          </Text>
        </View>
      </View>
    </BaseScreenLayout>
  );
}
