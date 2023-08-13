import { Icon } from '@rneui/base';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextVariant } from '@jl/constants';

export function SectionLink({ text, onPress }) {
  const mapIcon = text => {
    switch (text) {
      case 'Account':
        return 'user';
      case 'Tags':
        return 'tag';
      case 'Favorites':
        return 'heart';
      case 'Hidden Notes':
        return 'file';
      case 'Change Password':
        return 'lock';
      case 'Add PIN':
        return 'key';
      case 'Change PIN':
        return 'key';
      case 'Logout':
        return 'log-out';
    }
  };
  return (
    <Pressable
      style={tw`rounded-lg mb-2.5 p-4 justify-between items-center flex-row bg-[${
        Color.Neutral.JL350
      }] ${text === 'Logout' ? 'mt-9' : ''}`}
      onPress={onPress}>
      <View style={tw`flex-row gap-4 items-center`}>
        <View
          style={tw`justify-center p-2 rounded-md bg-[${
            text !== 'Logout' ? Color.Primary.Jl100 : Color.Warning.JL100
          }]`}>
          <Icon
            type="feather"
            name={mapIcon(text)}
            size={20}
            color={text !== 'Logout' ? Color.Primary.Jl500 : Color.Warning.JL500}
          />
        </View>
        <Text variant={TextVariant.Body2SemiBold} color={text === 'Logout' && Color.Warning.JL700}>
          {text}
        </Text>
      </View>
      {text !== 'Logout' && <Icon type="feather" name="chevron-right" size={20} />}
    </Pressable>
  );
}
