import { Icon } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextVariant } from '@jl/constants';
import { useFetch } from '@jl/hooks';
import { TagsService } from '@jl/services';
import { useSelector } from '@jl/stores';

type ItemProps = {
  item: string;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

interface TagsListProps {
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
  selectedTag: string;
}

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <Pressable
    onPress={onPress}
    style={[
      tw`py-1.5 px-4 bg-black border mr-2 border-gray-200 rounded-[15px] gap-1 flex-row items-center`,
      { backgroundColor: backgroundColor },
    ]}>
    <Icon type="feather" name="hash" size={18} color={textColor} />
    <Text variant={TextVariant.Label2SemiBold} color={textColor}>
      {item}
    </Text>
  </Pressable>
);

export function TagsList({ selectedTag, setSelectedTag }: TagsListProps) {
  const { userId } = useSelector(state => state.userStore.userData);
  const { data = [] } = useFetch(() => TagsService.getAllTags(userId));
  const [allTags, setAlTags] = useState([]);

  const renderItem = ({ item }: { item: string }) => {
    const backgroundColor = item === selectedTag ? Color.Primary.Jl500 : Color.Tertiary.JL200;
    const color = item === selectedTag ? Color.Neutral.white : Color.Neutral.JL900;

    return (
      <Item item={item} onPress={() => setSelectedTag(item)} backgroundColor={backgroundColor} textColor={color} />
    );
  };

  useEffect(() => {
    if (data) {
      setAlTags(['All', ...data]);
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
