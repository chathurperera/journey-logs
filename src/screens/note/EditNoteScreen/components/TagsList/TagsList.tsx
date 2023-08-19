import { Icon } from '@rneui/base';
import React, { useCallback } from 'react';
import { FlatList, Pressable, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextVariant } from '@jl/constants';

type ItemProps = {
  item: string;
  handleOnPress: (item: string) => void;
  backgroundColor: string;
  textColor: string;
};

type TagsListProps = {
  setNoteTags: React.Dispatch<React.SetStateAction<string[]>>;
  noteTags: string[];
  allTags: string[];
};

const Item = React.memo(({ item, handleOnPress, backgroundColor, textColor }: ItemProps) => {
  return (
    <Pressable
      onPress={() => handleOnPress(item)}
      style={[
        tw`py-2 px-4 bg-black border mr-2 border-gray-200 rounded-[20px] gap-1 flex-row items-center justify-between`,
        { backgroundColor: backgroundColor },
      ]}>
      <Icon type="feather" name="hash" size={18} color={textColor} />
      <Text variant={TextVariant.Body2Regular} color={textColor}>
        {item}
      </Text>
    </Pressable>
  );
});

export function TagsList({ setNoteTags, noteTags, allTags }: TagsListProps) {
  const toggleTag = useCallback(
    (tag: string) => {
      if (noteTags?.includes(tag)) {
        setNoteTags(prevTags => prevTags.filter(t => t !== tag));
      } else {
        setNoteTags(prevTags => [...prevTags, tag]);
      }
    },
    [noteTags, setNoteTags],
  );

  const renderItem = useCallback(
    ({ item }) => {
      const isSelected = noteTags?.includes(item);
      return (
        <Item
          item={item}
          handleOnPress={toggleTag}
          backgroundColor={isSelected ? Color.Neutral.black : Color.Tertiary.JL200}
          textColor={isSelected ? Color.Neutral.white : Color.Neutral.JL900}
        />
      );
    },
    [noteTags, toggleTag],
  );

  return (
    <View style={tw`my-3`}>
      <FlatList
        horizontal
        contentContainerStyle={tw``}
        data={allTags}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </View>
  );
}
