import { Icon } from '@rneui/base';
import React from 'react';
import { Pressable } from 'react-native';

import { tw } from '@jl/config';
import { Color } from '@jl/constants';
import { NavigationService } from '@jl/services';

interface HeaderBackButtonProps {
  navigationCallBack?: () => void;
}

export function HeaderBackButton({ navigationCallBack }: HeaderBackButtonProps) {
  const handleOnPress = () => {
    if (navigationCallBack !== undefined) {
      navigationCallBack();
    } else {
      NavigationService.goBack();
    }
  };

  return (
    <Pressable
      style={tw`rounded-full w-10 h-10 justify-center bg-[${Color.Neutral.JL50}] z-30 `}
      onPress={handleOnPress}>
      <Icon type="feather" name="chevron-left" size={30} color={Color.Neutral.JL800} />
    </Pressable>
  );
}
