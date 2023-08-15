import { Icon } from '@rneui/base';
import React from 'react';
import { View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';
import { NavigationService } from '@jl/services';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

export function MaxPinCodeAttemptsReachedScreen() {
  return (
    <BaseScreenLayout>
      <View style={tw`mx-5 flex-1 pt-20 relative`}>
        <Text variant={TextVariant.Heading3Regular} textAlign={TextAlignment.Center} color={Color.Neutral.JL600}>
          Maximum attempts reached
        </Text>

        <View style={tw`rounded-lg border-[${Color.Neutral.JL300}] px-4 py-2 my-8 border mx-auto`}>
          <Text variant={TextVariant.Heading3Regular} textAlign={TextAlignment.Center}>
            05:45
          </Text>
        </View>

        <View style={tw`rounded-full w-18 h-18 bg-[${Color.Warning.JL700}] mx-auto justify-center mt-20 mb-10`}>
          <Icon name="lock" type="feather" color={Color.Neutral.white} size={28} />
        </View>
        <View style={tw`px-5 mb-30`}>
          <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL600} textAlign={TextAlignment.Center}>
            To protect your information, access has been locked for 5 minutes. Come back later and try again.
          </Text>
        </View>
        <View style={tw`absolute bottom-5 left-0 right-0`}>
          <Text
            variant={TextVariant.Link}
            onPress={() => NavigationService.goBack()}
            color={Color.Primary.Jl500}
            textAlign={TextAlignment.Center}>
            GO BACK
          </Text>
        </View>
      </View>
    </BaseScreenLayout>
  );
}
