import { Icon } from '@rneui/base';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';
import { HeaderBackButton } from '@jl/navigation';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { DummyTags } from './DummyTags';

interface TagsScreenProps {
  testID: string;
}

const renderTags = () => {
  return DummyTags.map(tag => (
    <View
      key={tag}
      style={tw`flex-row items-center justify-between py-4 border-b border-slate-300`}>
      <View style={tw`flex-row items-center gap-3`}>
        <Icon type="feather" name="hash" />
        <Text variant={TextVariant.Body2Regular}>{tag}</Text>
      </View>
      <Icon type="feather" name="trash" color={Color.Warning.JL100} />
    </View>
  ));
};

export function TagsScreen({ testID }: TagsScreenProps) {
  return (
    <BaseScreenLayout testID={testID}>
      <View style={tw`mx-5 pt-5 flex-1`}>
        <View style={tw`justify-between flex-row items-center`}>
          <HeaderBackButton />
          <View style={tw`justify-between flex-row gap-2 items-center relative`}>
            <Pressable
              style={tw`bg-[${Color.Primary.Jl600}] py-2.5 px-6 rounded-3xl  gap-2 flex-row justify-between items-center`}>
              <Text
                variant={TextVariant.Label2SemiBold}
                color={Color.Neutral.white}
                textAlign={TextAlignment.Center}>
                Add tag
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={tw`mt-3`}>
          <Text variant={TextVariant.Heading3Regular} color={Color.Neutral.JL300}>
            {DummyTags.length} Tags
          </Text>
          <View style={tw`mt-3 `}>{renderTags()}</View>
        </View>
      </View>
    </BaseScreenLayout>
  );
}
