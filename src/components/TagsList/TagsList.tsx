import { Icon } from '@rneui/base';
import React, { useCallback } from 'react';
import { FlatList, Pressable, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextVariant } from '@jl/constants';
import { useFetch } from '@jl/hooks';
import { TagsService } from '@jl/services';
import { useSelector } from '@jl/stores';

type ItemProps = {
  item: string;
  handleOnPress: (item: string) => void;
  backgroundColor: string;
  textColor: string;
};

interface TagsListProps {
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTags: string[];
  isEditable?: boolean;
  noteTags?: string[];
}

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

export function TagsList({ setSelectedTags, selectedTags, isEditable = false, noteTags = [] }: TagsListProps) {
  const { userId } = useSelector(state => state.userStore.userData);
  const { data } = useFetch(() => TagsService.getAllTags(userId));

  const tagsToDisplay = isEditable ? data : noteTags;

  const toggleTag = useCallback(
    (tag: string) => {
      if (!isEditable) return;

      if (selectedTags.includes(tag)) {
        setSelectedTags((prevTags: string[]) => prevTags.filter((t: string) => t !== tag));
      } else {
        setSelectedTags((prevTags: string[]) => [...prevTags, tag]);
      }
    },
    [selectedTags, setSelectedTags, isEditable],
  );

  const renderItem = useCallback(
    ({ item }) => {
      const backgroundColor = selectedTags.includes(item) ? Color.Neutral.black : Color.Tertiary.JL200;
      const color = selectedTags.includes(item) ? Color.Neutral.white : Color.Neutral.JL900;
      return <Item item={item} handleOnPress={toggleTag} backgroundColor={backgroundColor} textColor={color} />;
    },
    [selectedTags, toggleTag],
  );

  return (
    <View style={tw`my-3`}>
      <FlatList
        horizontal
        contentContainerStyle={tw``}
        data={tagsToDisplay}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </View>
  );
}
