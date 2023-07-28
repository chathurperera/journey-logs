import React from 'react';
import { Image, View } from 'react-native';

import { images } from '@jl/assets';
import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';

export function SocialAuth() {
  return (
    <View
      style={[
        tw`border-[1px] border-[#E9CFCF] rounded-[10px] px-3.5 flex-row  py-3 relative justify-center bg-[${Color.Secondary.JL200}]`,
      ]}>
      <Image source={images.googleIcon} style={tw`absolute top-[10px] bottom-[10px] left-2.5`} />
      <Text variant={TextVariant.Body1Regular} textAlign={TextAlignment.Center}>
        Continue with Google
      </Text>
    </View>
  );
}
