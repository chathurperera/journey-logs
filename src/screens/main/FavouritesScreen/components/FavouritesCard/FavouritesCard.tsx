import { Icon } from '@rneui/base';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextVariant } from '@jl/constants';
import { NoteData } from '@jl/models';
import { NavigationService } from '@jl/services';
import { getRelativeTimeFromTimestamp } from '@jl/utils';

interface NoteCardProps extends NoteData {
  onPress?: () => void;
}
export function FavouritesCard({ title, body, createdAt, id }: NoteCardProps) {
  return (
    <Pressable
      onPress={() => NavigationService.navigate(Route.PreviewNote, { noteId: id })}
      style={tw`border mb-4 rounded-2.5 px-2.8 py-2.8 bg-[${Color.Neutral.white}] relative  border-gray-200`}>
      <View style={tw`mb-1.2 flex-row justify-between`}>
        <Text variant={TextVariant.Title2} numberOfLines={1} color={Color.Neutral.JL900}>
          {title}
        </Text>
        <Icon type="ant-design" name="heart" color={Color.Primary.Jl500} />
      </View>
      <Text variant={TextVariant.Body1Regular} numberOfLines={2} color={Color.Neutral.JL600}>
        {body}
      </Text>
      <View style={tw`mt-2`}>
        <Text variant={TextVariant.Label1Regular} color={Color.Primary.Jl400}>
          {getRelativeTimeFromTimestamp(createdAt)}
        </Text>
      </View>
    </Pressable>
  );
}
