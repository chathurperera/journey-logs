import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';

import { LoadingSpinner, Text } from '@jl/components';
import { tw } from '@jl/config';
import { TextVariant } from '@jl/constants';
import { useFirestorePagination } from '@jl/hooks';
import { NoteData } from '@jl/models';

import { NoteCard } from './NoteCard';

export function NotesList() {
  const [selectedId, setSelectedId] = useState<string>();

  const collectionName = 'notes';
  const pageSize = 10;
  const userId = auth().currentUser?.uid;
  console.log('userId in NotesList', userId);

  const { data, isLoading, isFetchingMore, isEndReached, fetchMoreData, refreshData } =
    useFirestorePagination(collectionName, pageSize, userId);

  console.log('data', data);
  const renderFooter = () => {
    if (isLoading) return <LoadingSpinner size="large" />;
    if (data.length === 0)
      return (
        <Text variant={TextVariant.Body2SemiBold}>No notes available. Start adding notes!</Text>
      );
    if (isFetchingMore) return <LoadingSpinner size="small" />;
    if (isEndReached)
      return <Text variant={TextVariant.Body2SemiBold}>No more notes to load.</Text>;
    return null;
  };

  const renderItem = ({ item }: { item: NoteData }) => {
    return <NoteCard {...item} onPress={() => setSelectedId(item.id)} />;
  };

  return (
    <View style={tw`mt-6 flex-1`}>
      <FlatList
        contentContainerStyle={tw``}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={renderFooter}
        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd >= 0.5) {
            fetchMoreData();
          }
        }}
        refreshing={isLoading}
        onRefresh={refreshData}
        onEndReachedThreshold={0.5}
        extraData={selectedId}
      />
    </View>
  );
}
