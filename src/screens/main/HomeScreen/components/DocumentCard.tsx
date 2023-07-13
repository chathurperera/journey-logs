import { BlurView } from '@react-native-community/blur';
import { Icon } from '@rneui/base';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextVariant } from '@jl/constants';

import { ItemData } from './DocumentsList';

type DocumentCardProps = {
  documentData: ItemData;
  onPress: () => void;
};

export function DocumentCard({ documentData }: DocumentCardProps) {
  return (
    <Pressable style={tw`border-neutral-50 mb-4 rounded-2.25 p-5 bg-[${Color.Neutral.white}] relative`}>
      <View style={tw`mb-2`}>
        <Text variant={TextVariant.Title2}>{documentData.title} </Text>
      </View>
      <Text variant={TextVariant.Body1Regular} numberOfLines={2}>
        {documentData.content}
      </Text>
      <View style={tw`mt-2`}>
        <Text variant={TextVariant.Body1Regular} color={Color.Neutral.JL100}>
          {documentData.date}
        </Text>
      </View>

      {documentData.isLocked && (
        <>
          <BlurView
            blurType="light"
            blurAmount={4}
            reducedTransparencyFallbackColor="white"
            style={tw`absolute inset-0`}
          />

          <View style={tw`absolute m-auto left-0 right-0  h-full justify-center pt-10`}>
            <Icon type="feather" name="lock" size={30} />
          </View>
        </>
      )}
    </Pressable>
  );
}
