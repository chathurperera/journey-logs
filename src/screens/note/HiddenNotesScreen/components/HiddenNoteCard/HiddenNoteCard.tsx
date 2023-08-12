import { Icon } from '@rneui/base';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextVariant } from '@jl/constants';
import { NavigationService } from '@jl/services';
import { getRelativeTimeFromTimestamp } from '@jl/utils';

interface HiddenNoteCardProps {
  title: string;
  createdAt: number;
  id: string;
}

export function HiddenNoteCard({ title, createdAt, id }: HiddenNoteCardProps) {
  return (
    <Pressable
      onPress={() => NavigationService.navigate(Route.PreviewNote, { noteId: id })}
      style={tw`bg-[${Color.Neutral.JL50}] py-3.5 px-4 rounded-2 flex-row justify-between items-center mb-3`}>
      <View>
        <View style={tw`mb-1`}>
          <Text variant={TextVariant.Body2SemiBold}>{title}</Text>
        </View>
        <Text variant={TextVariant.Label1Regular} color={Color.Neutral.JL400}>
          {getRelativeTimeFromTimestamp(createdAt)}
        </Text>
      </View>
      <Icon type="feather" name="chevron-right" size={30} />
    </Pressable>
  );
}
