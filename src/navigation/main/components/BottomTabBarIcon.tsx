import { Icon } from '@rneui/themed';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextVariant } from '@jl/constants';

interface BottomTabBarIconProps {
  isFocused: boolean;
  routeName: string;
  onPress: () => void;
}

export function BottomTabBarIcon({ isFocused, routeName, onPress }: BottomTabBarIconProps) {
  let iconName;
  let iconLabel;

  switch (routeName) {
    case Route.HomeTab:
      iconName = 'home';
      iconLabel = 'Home';
      break;
    case Route.FavouritesTab:
      iconName = 'heart';
      iconLabel = 'Favourites';
      break;
    case Route.SettingsTab:
      iconName = 'settings';
      iconLabel = 'Settings';
      break;
    case Route.CalendarTab:
      iconName = 'calendar';
      iconLabel = 'Calendar';
      break;
    default:
      break;
  }
  return (
    <>
      <Pressable onPress={onPress}>
        <View style={tw`mb-.5`}>
          <Icon type="feather" name={iconName} color={isFocused ? Color.Neutral.JL700 : Color.Neutral.JL50} size={28} />
        </View>
        <Text variant={TextVariant.Label1Regular} color={isFocused ? Color.Neutral.JL700 : Color.Neutral.JL50}>
          {iconLabel}
        </Text>
      </Pressable>
    </>
  );
}
