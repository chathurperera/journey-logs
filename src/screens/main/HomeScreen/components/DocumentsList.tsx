import React, { useState } from 'react';
import { FlatList, View } from 'react-native';

import { tw } from '@jl/config';

import { DocumentCard } from './DocumentCard';
import { DummyDocuments } from './DummyDocuments';

export interface ItemData {
  id: string;
  content: string;
  title: string;
  date: string;
  isLocked: boolean;
}

export function DocumentsList() {
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({ item }: { item: ItemData }) => {
    return <DocumentCard documentData={item} onPress={() => setSelectedId(item.id)} />;
  };

  return (
    <View style={tw`mt-6 flex-1`}>
      <FlatList
        contentContainerStyle={tw``}
        data={DummyDocuments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </View>
  );
}
