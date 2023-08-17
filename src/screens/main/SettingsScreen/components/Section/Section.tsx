import React from 'react';
import { View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextVariant } from '@jl/constants';

export function Section({ children, title }) {
  return (
    <View>
      <View style={tw`mb-3`}>
        <Text variant={TextVariant.Body1Regular} textTransform="uppercase" color={Color.Neutral.JL300}>
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}
