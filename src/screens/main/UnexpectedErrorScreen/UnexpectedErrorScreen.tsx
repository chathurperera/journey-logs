import { Button } from '@rneui/themed';
import React from 'react';
import { Image, View } from 'react-native';

import { images } from '@jl/assets';
import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

interface UnexpectedErrorScreenProps {
  error?: Error;
  resetError?: any;
  testID?: string;
}

export function UnexpectedErrorScreen({ resetError, testID }: UnexpectedErrorScreenProps) {
  return (
    <BaseScreenLayout testID={testID}>
      <View style={tw`mx-5 flex-1 justify-center`}>
        <Image source={images.error} style={tw`w-100 h-80`} resizeMode="contain" />
        <View style={tw`mb-2`}>
          <Text variant={TextVariant.Heading2SemiBold} textAlign={TextAlignment.Center}>
            Oops! Something Went Wrong.
          </Text>
        </View>
        <Text
          variant={TextVariant.Body2SemiBold}
          textAlign={TextAlignment.Center}
          color={Color.Neutral.JL400}>
          Sorry, we hit a snag. Please click 'Try Again'. We're on it and aim to resolve this
          swiftly. Your experience is important to us."
        </Text>
        <Button
          onPress={resetError}
          title="Try Again"
          style={tw`w-full`}
          buttonStyle={tw`bg-[${Color.Primary.Jl500}] text-[${Color.Neutral.white}] rounded-lg py-3 mt-19`}
          titleStyle={{ fontSize: 23 }}
        />
      </View>
    </BaseScreenLayout>
  );
}
