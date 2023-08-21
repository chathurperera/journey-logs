import { Icon } from '@rneui/themed';
import React from 'react';
import { Pressable, View } from 'react-native';

import { tw } from '@jl/config';
import { Color, Route } from '@jl/constants';

interface BottomTabBarIconProps {
  isFocused: boolean;
  routeName: string;
  onPress: () => void;
}

export function BottomTabBarIcon({ isFocused, routeName, onPress }: BottomTabBarIconProps) {
  let iconName;

  switch (routeName) {
    case Route.HomeTab:
      iconName = 'appstore-o';
      break;
    case Route.FavouritesTab:
      iconName = 'hearto';
      break;
    case Route.SettingsTab:
      iconName = 'setting';
      break;
    case Route.CalendarTab:
      iconName = 'calendar';
      break;
    default:
      break;
  }
  return (
    <>
      <Pressable onPress={onPress}>
        <View
          style={tw`mb-.5 p-2 ${isFocused ? `bg-[${Color.Neutral.JL50}] rounded-lg` : `bg-[${Color.Neutral.white}]`}`}>
          <Icon
            type="ant-design"
            name={iconName}
            color={isFocused ? Color.Neutral.black : Color.Neutral.JL200}
            size={28}
          />
        </View>
      </Pressable>
    </>
  );
}
