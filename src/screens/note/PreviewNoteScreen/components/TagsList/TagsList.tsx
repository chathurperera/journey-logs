import { Icon } from '@rneui/base';
import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextVariant } from '@jl/constants';

interface TagsListProps {
  tags: string[];
}

export function TagsList({ tags }: TagsListProps) {
  console.log('tags in TgasList', tags);

  const renderItem = useCallback(
    ({ item }) => {
      console.log('item', item);
      return (
        <View
          style={tw`py-2 px-4 bg-black border mr-2 border-gray-200 rounded-[20px] gap-1 flex-row items-center justify-between bg-[${Color.Neutral.black}]`}>
          <Icon type="feather" name="hash" size={18} color={Color.Neutral.white} />
          <Text variant={TextVariant.Body2Regular} color={Color.Neutral.white}>
            {item}
          </Text>
        </View>
      );
    },
    [tags],
  );

  return (
    <View style={tw`my-3`}>
      <FlatList
        horizontal
        data={tags}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </View>
  );
}
