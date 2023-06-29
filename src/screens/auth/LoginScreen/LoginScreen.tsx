import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, View } from 'react-native';

import { Text, TextField } from '@jl/components';
import { Color, TextVariant } from '@jl/constants';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { LoginFormValues, loginValidationSchema } from './Login.validations';

export function LoginScreen() {
  const { handleSubmit, control } = useForm<LoginFormValues>({ resolver: zodResolver(loginValidationSchema) });

  const handleOnSubmit = data => {
    console.log('data', data);
    console.log('form submitted');
  };

  return (
    <BaseScreenLayout>
      <View className="mt-10 mx-5">
        <View className="w-[210px] mb-14">
          <Text variant={TextVariant.Heading1Regular} color={Color.Primary.Jl700}>
            Log in to Journey Logs
          </Text>
        </View>
        <TextField control={control} label="Email" name="email" />
        <TextField control={control} label="Password" name="password" secureTextEntry />
        <Button title="Login" onPress={handleSubmit(handleOnSubmit)} />
      </View>
    </BaseScreenLayout>
  );
}
