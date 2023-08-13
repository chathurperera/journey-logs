import { Icon } from '@rneui/base';
import React, { useState } from 'react';
import { FlatList, Pressable } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextVariant } from '@jl/constants';

type ItemData = {
  id: string;
  title: string;
};

const DATA: ItemData[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'All',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Office',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Personal',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29dad',
    title: 'UI',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29afe',
    title: 'School',
  },
  {
    id: '586saf3a0f-3da1-471f-bd96-145571e29afe',
    title: 'Household',
  },
  {
    id: '58694daff233f-3da1-471f-bd96-145571e29afe',
    title: 'Games',
  },
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <Pressable
    onPress={onPress}
    style={[
      tw`py-1.5 px-4 bg-black border mr-2 border-gray-200 rounded-[15px] gap-1 flex-row items-center`,
      { backgroundColor: backgroundColor },
    ]}>
    <Icon type="feather" name="hash" size={18} color={textColor} />
    <Text variant={TextVariant.Label2SemiBold} color={textColor}>
      {item.title}
    </Text>
  </Pressable>
);

export function TagsList() {
  const [selectedId, setSelectedId] = useState<string>(DATA[0].id);

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? Color.Primary.Jl500 : Color.Secondary.JL200;
    const color = item.id === selectedId ? Color.Neutral.white : Color.Neutral.JL900;

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <FlatList
      horizontal
      contentContainerStyle={tw``}
      data={DATA}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      extraData={selectedId}
    />
  );
}
