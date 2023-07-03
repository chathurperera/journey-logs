import React from 'react';
import { Image, View } from 'react-native';

import { images } from '@jl/assets';
import { Text } from '@jl/components';
import { Color, TextAlignment, TextVariant } from '@jl/constants';

export function SocialAuth() {
  return (
    <View
      style={{ backgroundColor: Color.Secondary.JL200 }}
      className="border-[1px] border-[#E9CFCF] rounded-[10px] px-3.5 flex-row  py-3 relative justify-center ">
      <Image source={images.googleIcon} className="absolute top-[10px] bottom-[10px] left-2.5 " />
      <Text variant={TextVariant.Body1Regular} textAlign={TextAlignment.Center}>
        Continue with Google
      </Text>
    </View>
  );
}
