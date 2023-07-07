import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, PasswordField, Text, TextField } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextVariant } from '@jl/constants';
import { AuthService, NavigationService } from '@jl/services';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { LoginFormValues, loginValidationSchema } from './Login.validations';

export function LoginScreen() {
  const { handleSubmit, control } = useForm<LoginFormValues>({ resolver: zodResolver(loginValidationSchema) });
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async formData => {
    setIsLoading(true);
    await AuthService.signUp(formData);
    setIsLoading(false);
  };

  return (
    <BaseScreenLayout>
      <View style={tw`flex-1 justify-between mt-10 mx-5`}>
        <View>
          <View style={tw`w-[210px] mb-14`}>
            <Text variant={TextVariant.Heading1Regular} color={Color.Neutral.JL900}>
              Log in to Journey Logs
            </Text>
          </View>
          <View style={tw`mb-10`}>
            <View style={tw`mb-2`}>
              <TextField control={control} label="Email" name="email" />
            </View>
            <View style={tw`mb-3`}>
              <PasswordField control={control} label="Password" name="password" />
            </View>
            <Text variant={TextVariant.Link} color={Color.Primary.Jl500}>
              Forgot password ?
            </Text>
          </View>
          <Button title="Login" onPress={handleSubmit(handleOnSubmit)} loading={isLoading} />
        </View>
        <View style={tw`gap-1 justify-center flex-row`}>
          <Text variant={TextVariant.Body1Regular}>New to Journey Logs? </Text>
          <Text variant={TextVariant.Link} color={Color.Primary.Jl400} onPress={() => NavigationService.navigate(Route.Signup)}>
            Sign up
          </Text>
        </View>
      </View>
    </BaseScreenLayout>
  );
}
