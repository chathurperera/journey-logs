import { BlurView } from '@react-native-community/blur';
import { Icon } from '@rneui/base';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextAlignment, TextVariant } from '@jl/constants';
import { NoteData } from '@jl/models';
import { NavigationService } from '@jl/services';
import { getRelativeTimeFromTimestamp } from '@jl/utils';

interface NoteCardProps extends NoteData {
  onPress?: () => void;
}

export function NoteCard({ title, body, createdAt, isEncrypted, id }: NoteCardProps) {
  return (
    <Pressable
      onPress={() => NavigationService.navigate(Route.PreviewNote, { noteId: id })}
      style={[
        tw`border-neutral-50 mb-4 rounded-2.5 px-2.8 py-2.8 bg-[${Color.Neutral.white}] relative`,
        {
          shadowColor: '#9f9f9f',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.17,
          shadowRadius: 3.05,
          elevation: 4,
        },
      ]}>
      <View style={tw`mb-1.2`}>
        <Text variant={TextVariant.Title2} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <Text variant={TextVariant.Body1Regular} numberOfLines={2}>
        {body}
      </Text>
      <View style={tw`mt-2`}>
        <Text variant={TextVariant.Label1Regular} color={Color.Neutral.JL100}>
          {getRelativeTimeFromTimestamp(createdAt)}
        </Text>
      </View>

      {isEncrypted && (
        <>
          <BlurView
            blurType="light"
            blurAmount={4}
            reducedTransparencyFallbackColor="white"
            style={tw`absolute inset-0 rounded-2.5`}
          />

          <View style={tw`absolute m-auto left-0 right-0  h-full justify-center pt-4`}>
            <Icon type="feather" name="lock" size={30} />
            <View style={tw`mt-2`}>
              <Text variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Center}>
                Locked content
              </Text>
            </View>
          </View>
        </>
      )}
    </Pressable>
  );
}
