import { Icon } from '@rneui/base';
import React from 'react';
import { Pressable, View } from 'react-native';
import HTMLView from 'react-native-htmlview';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextVariant } from '@jl/constants';
import { NoteData } from '@jl/models';
import { NavigationService } from '@jl/services';
import { getRelativeTimeFromTimestamp } from '@jl/utils';

interface NoteCardProps extends NoteData {
  onPress?: () => void;
  showIcon?: boolean;
}

export function NoteCard({ title, body, createdAt, showIcon = false, id }: NoteCardProps) {
  return (
    <Pressable
      onPress={() => NavigationService.navigate(Route.PreviewNote, { noteId: id })}
      style={tw`border mb-4 rounded-2.5 px-2.8 py-2.8 bg-[${Color.Neutral.white}] relative  border-gray-200 flex-row justify-between items-center`}>
      <View>
        <View style={tw`mb-1.2 flex-row justify-between`}>
          <Text variant={TextVariant.Heading3SemiBold} numberOfLines={1} color={Color.Neutral.JL900}>
            {title}
          </Text>
        </View>
        <HTMLView value={body} />
        <View style={tw`mt-2`}>
          <Text variant={TextVariant.Label1Regular} color={Color.Neutral.JL300}>
            {getRelativeTimeFromTimestamp(createdAt)}
          </Text>
        </View>
      </View>
      {showIcon && <Icon type="feather" name="chevron-right" color={Color.Primary.Jl500} />}
    </Pressable>
  );
}
