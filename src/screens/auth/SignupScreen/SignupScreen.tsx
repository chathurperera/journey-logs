import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, PasswordField, Text, TextField } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextVariant } from '@jl/constants';
import { AuthService, NavigationService } from '@jl/services';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { SignupFormValues, signupValidationSchema } from './Signup.validations';

export function SignupScreen() {
  const { handleSubmit, control } = useForm<SignupFormValues>({ resolver: zodResolver(signupValidationSchema) });
  console.log('signup screen renders');
  const handleOnSubmit = async formData => {
    console.log('formData', formData);
    await AuthService.signUp(formData);
  };

  return (
    <BaseScreenLayout>
      <View style={tw`flex-1 justify-between mt-10 mx-5`}>
        <View>
          <View style={tw`w-[210px] mb-14`}>
            <Text variant={TextVariant.Heading1Regular} color={Color.Neutral.JL900}>
              Sign up to Journey Logs
            </Text>
          </View>
          <View style={tw`mb-10`}>
            <View style={tw`mb-2`}>
              <TextField control={control} label="Name" name="name" />
            </View>
            <View style={tw`mb-2`}>
              <TextField control={control} label="Email" name="email" />
            </View>
            <View style={tw`mb-3`}>
              <PasswordField control={control} label="Password" name="password" />
            </View>
            <View style={tw`mb-3`}>
              <PasswordField control={control} label="Confirm Password" name="confirmPassword" />
            </View>
          </View>
          <Button title="Sign up" onPress={handleSubmit(handleOnSubmit)} />
        </View>
        <View style={tw`gap-1 justify-center flex-row`}>
          <Text variant={TextVariant.Body1Regular}>Already have an account? </Text>
          <Text variant={TextVariant.Link} color={Color.Primary.Jl400} onPress={() => NavigationService.navigate(Route.Login)}>
            Login
          </Text>
        </View>
      </View>
    </BaseScreenLayout>
  );
}
