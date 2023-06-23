import React from 'react';
import { View } from 'react-native';

import { Text } from '@jl/components';
import { Color, TextVariant } from '@jl/constants';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

export function LoginScreen() {
  return (
    <BaseScreenLayout>
      <View className="mt-10 mx-5 ">
        <Text variant={TextVariant.Heading1} color={Color.Primary.Jl700}>
          Login in to
        </Text>
        {/* <Text>Journey Logs</Text> */}
      </View>
      {/* <TextField label={131414} /> */}
    </BaseScreenLayout>
  );
}
