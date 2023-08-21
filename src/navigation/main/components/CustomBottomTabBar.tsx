import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import React from 'react';
import { Pressable, View } from 'react-native';

import { tw } from '@jl/config';
import { Color, Route } from '@jl/constants';
import { NavigationService } from '@jl/services';

import { BottomTabBarIcon } from './BottomTabBarIcon';

export function CustomBottomTabBar({ state, navigation }: BottomTabBarProps) {
  const renderNewDocumentIcon = () => {
    return (
      <Pressable
        onPress={() => NavigationService.navigate(Route.NotesStack)}
        style={[
          tw`w-15 h-15 rounded-full bg-[${Color.Primary.Jl500}] justify-center items-center flex-1 absolute`,
          {
            shadowColor: `${Color.Primary.Jl100}`,
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
      </Pressable>
    );
  };

  return (
    <View
      style={[
        tw`flex-row absolute rounded-3xl bottom-5 bg-white mx-5 border-[${Color.Neutral.JL50}] border`,
        {
          shadowColor: '#2a2a2a80',
          shadowOffset: {
            width: 2,
            height: 6,
          },
          shadowOpacity: 0.17,
          shadowRadius: 4,
          elevation: 5,
        },
      ]}>
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
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {route.name === Route.PlaceHolderRoute ? (
                renderNewDocumentIcon()
              ) : (
                <BottomTabBarIcon isFocused={isFocused} routeName={label} onPress={onPress} />
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}
