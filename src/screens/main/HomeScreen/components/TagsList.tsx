import { Icon } from '@rneui/base';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextVariant } from '@jl/constants';
import { useFetch } from '@jl/hooks';
import { TagsService } from '@jl/services';
import { useSelector } from '@jl/stores';

type ItemProps = {
  item: string;
  onPress: (item: string) => void; // Use item as a parameter
  backgroundColor: string;
  textColor: string;
};

interface TagsListProps {
  selectedTag: string;
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
}

const Item = React.memo(({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <Pressable
    onPress={() => onPress(item)}
    style={[
      tw`py-1.5 px-4 bg-black border mr-2 border-gray-200 rounded-[15px] gap-1 flex-row items-center`,
      { backgroundColor: backgroundColor },
    ]}>
    <Icon type="feather" name="hash" size={18} color={textColor} />
    <Text variant={TextVariant.Label2SemiBold} color={textColor}>
      {item}
    </Text>
  </Pressable>
));

export function TagsList({ selectedTag, setSelectedTag }: TagsListProps) {
  const { userId } = useSelector(state => state.userStore.userData);
  const { data = [] } = useFetch(() => TagsService.getAllTags(userId));
  const [allTags, setAllTags] = useState(['All']);

  const handlePress = useCallback(
    (item: string) => {
      setSelectedTag(item);
    },
    [setSelectedTag],
  );

  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      const backgroundColor = item === selectedTag ? Color.Neutral.black : Color.Tertiary.JL200;
      const color = item === selectedTag ? Color.Neutral.white : Color.Neutral.JL900;

      return <Item item={item} onPress={handlePress} backgroundColor={backgroundColor} textColor={color} />;
    },
    [selectedTag],
  );

  useEffect(() => {
    console.log('data', data);
    if (data && data.length) {
      setAllTags(['All', ...data]);
    }
  }, [data]);

  return (
    <FlatList
      horizontal
      data={allTags}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={item => item}
    />
  );
}
