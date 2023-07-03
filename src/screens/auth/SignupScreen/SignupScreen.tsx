import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, PasswordField, Text, TextField } from '@jl/components';
import { Color, TextVariant } from '@jl/constants';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { SocialAuth } from '../components/SocialAuth';
import { SignupFormValues, signupValidationSchema } from './Signup.validations';

export function SignupScreen() {
  const { handleSubmit, control } = useForm<SignupFormValues>({ resolver: zodResolver(signupValidationSchema) });

  const handleOnSubmit = data => {
    console.log('data', data);
    console.log('form submitted');
  };

  return (
    <BaseScreenLayout>
      <View className="flex-1 justify-between mt-10 mx-5">
        <View>
          <View className="w-[210px] mb-14">
            <Text variant={TextVariant.Heading1Regular} color={Color.Neutral.JL900}>
              Sign up to Journey Logs
            </Text>
          </View>
          <View className="mb-10">
            <View className="mb-2">
              <TextField control={control} label="Name" name="name" />
            </View>
            <View className="mb-2">
              <TextField control={control} label="Email" name="email" />
            </View>
            <View className="mb-3">
              <PasswordField control={control} label="Password" name="password" />
            </View>
            <View className="mb-3">
              <PasswordField control={control} label="Confirm Password" name="confirmPassword" />
            </View>
          </View>
          <Button title="Sign up" onPress={handleSubmit(handleOnSubmit)} />
          <View className="flex-row justify-between items-center my-6">
            <View className="h-[2px] bg-[#E9CFCF] w-[40%]"></View>
            <Text variant={TextVariant.Body1Regular} color={Color.Neutral.JL500}>
              OR
            </Text>
            <View className="h-[2px] bg-[#E9CFCF] w-[40%]"></View>
          </View>
          <SocialAuth />
        </View>
        <View className="gap-1 justify-center flex-row">
          <Text variant={TextVariant.Body1Regular}>Already have an account? </Text>
          <Text variant={TextVariant.Link} color={Color.Primary.Jl400}>
            Login
          </Text>
        </View>
      </View>
    </BaseScreenLayout>
  );
}
