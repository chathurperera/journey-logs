import React from 'react';
import { Pressable, View } from 'react-native';
import HTMLView from 'react-native-htmlview';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextVariant } from '@jl/constants';
import { NoteData } from '@jl/models';
import { NavigationService } from '@jl/services';
import { getTimeFromTimestamp } from '@jl/utils';

interface CalendarCardProps extends NoteData {
  onPress?: () => void;
}

export function CalendarCard({ title, body, createdAt, id }: CalendarCardProps) {
  const truncateBody = (body: string) => {
    return body.length > 160 ? `${body.substring(0, 160)}...` : body;
  };

  return (
    <Pressable
      onPress={() => NavigationService.navigate(Route.PreviewNote, { noteId: id })}
      style={tw`border mb-4 rounded-2.5 px-2.8 py-2.8 bg-[${Color.Neutral.JL150}] relative  border-gray-200  flex-row justify-between items-center`}>
      <View>
        <View style={tw`mb-1.2 flex-row justify-between`}>
          <Text
            variant={TextVariant.Heading3SemiBold}
            numberOfLines={1}
            color={Color.Neutral.JL900}>
            {title}
          </Text>
          <Text variant={TextVariant.Label1Regular} color={Color.Neutral.JL300}>
            {getTimeFromTimestamp(createdAt)}
          </Text>
        </View>
        <HTMLView value={truncateBody(body)} />
        <View style={tw`mt-2`}></View>
      </View>
    </Pressable>
  );
}
