import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import React from 'react';
import { Pressable, View } from 'react-native';

import { tw } from '@jl/config';
import { Color, Route } from '@jl/constants';

import { BottomTabBarIcon } from './BottomTabBarIcon';

export function CustomBottomTabBar({ state, navigation }: BottomTabBarProps) {
  const renderNewDocumentIcon = () => {
    return (
      <View
        style={[
          tw`w-18 h-18 rounded-full bg-black justify-center items-center border-2 flex-1 absolute bottom-1`,
          {
            shadowColor: '#000',
            shadowOffset: {
              width: 1,
              height: 4,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.25,

            elevation: 4,
          },
        ]}>
        <Icon type="feather" name="plus" color={Color.Neutral.white} size={40} />
      </View>
    );
  };

  return (
    <View style={tw`flex-row absolute bottom-0 bg-white`}>
      {state.routes.map((route, index) => {
        const label = route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={index} style={tw`flex-1 justify-center items-center my-5`}>
            <Pressable onPress={onPress}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {route.name === Route.EditorTab ? (
                  renderNewDocumentIcon()
                ) : (
                  <BottomTabBarIcon isFocused={isFocused} routeName={label} />
                )}
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}
