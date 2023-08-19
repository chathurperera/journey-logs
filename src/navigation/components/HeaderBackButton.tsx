import { Icon } from '@rneui/base';
import React from 'react';
import { Pressable } from 'react-native';

import { tw } from '@jl/config';
import { Color } from '@jl/constants';
import { NavigationService } from '@jl/services';

export function HeaderBackButton() {
  return (
    <Pressable style={tw`py-1 absolute left-0 z-30 `} onPress={() => NavigationService.goBack()}>
      <Icon type="feather" name="chevron-left" size={30} color={Color.Neutral.JL800} />
    </Pressable>
  );
}
