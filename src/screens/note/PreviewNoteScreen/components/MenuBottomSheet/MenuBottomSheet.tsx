import { Icon } from '@rneui/base';
import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextVariant } from '@jl/constants';

export const MenuBottomSheet = forwardRef(function MenuBottomSheet(props, ref) {
  return (
    <Modalize ref={ref} adjustToContentHeight>
      <View
        style={tw`border-b-[${Color.Primary.Jl150}] p-4 flex-row items-center gap-2 border-b-2`}>
        <Icon type="feather" name="edit" size={25} />
        <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL500}>
          Edit note
        </Text>
      </View>
      <View
        style={tw`border-b-[${Color.Primary.Jl150}] p-4 flex-row items-center gap-2 border-b-2`}>
        <Icon type="feather" name="tag" size={25} />
        <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL500}>
          Add Tags
        </Text>
      </View>
      <View
        style={tw`border-b-[${Color.Primary.Jl150}] p-4 flex-row items-center gap-2 border-b-2`}>
        <Icon type="feather" name="lock" size={25} />
        <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL500}>
          Lock note
        </Text>
      </View>
      <View style={tw`border-b-[${Color.Primary.Jl150}] p-4 flex-row items-center gap-2`}>
        <Icon type="feather" name="trash-2" color={Color.Warning.JL100} size={25} />
        <Text variant={TextVariant.Body1SemiBold} color={Color.Warning.JL100}>
          Delete Note
        </Text>
      </View>
    </Modalize>
  );
});
