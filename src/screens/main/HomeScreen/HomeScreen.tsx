import firestore from '@react-native-firebase/firestore';
import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { LoadingSpinner, Text } from '@jl/components';
import { tw } from '@jl/config';
import { TextAlignment, TextVariant } from '@jl/constants';
import { useFirestorePagination } from '@jl/hooks';
import { NoteData } from '@jl/models';
import { useSelector } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { NoteCard } from './components/NoteCard';
import { TagsList } from './components/TagsList';

export function HomeScreen() {
  const { userId } = useSelector(state => state.userStore.userData);

  const [selectedId, setSelectedId] = useState<string>();
  const [selectedTag, setSelectedTag] = useState('All');
  // console.log('selectedTag', selectedTag);
  const pageSize = 10;

  const initialQuery = useMemo(() => {
    let query = firestore().collection('notes').where('userId', '==', userId).where('isEncrypted', '==', false);

    if (selectedTag !== 'All') {
      query = query.where('tags', 'array-contains', selectedTag);
    }
    query = query.orderBy('createdAt', 'desc');

    return query;
  }, [selectedTag]);

  const { data, isLoading, isFetchingMore, isEndReached, fetchMoreData, refreshData } = useFirestorePagination(
    initialQuery,
    pageSize,
  );

  const renderFooter = () => {
    if (isLoading) return <LoadingSpinner size="large" />;
    if (data.length === 0)
      return (
        <Text variant={TextVariant.Body2SemiBold} textAlign={TextAlignment.Center}>
          No notes available. Start adding notes!
        </Text>
      );
    if (isFetchingMore) return <LoadingSpinner size="small" />;
    if (isEndReached)
      return (
        <Text variant={TextVariant.Body2SemiBold} textAlign={TextAlignment.Center}>
          No more notes to load.
        </Text>
      );
    return null;
  };

  const renderItem = ({ item }: { item: NoteData }) => {
    return <NoteCard {...item} onPress={() => setSelectedId(item.id)} />;
  };

  return (
    <BaseScreenLayout wrapWithScrollView={false}>
      <View style={tw`mx-5 pt-5 flex-1`}>
        <View style={tw`w-[200px]`}>
          <Text variant={TextVariant.Heading3Regular}>Welcome to Journey logs</Text>
        </View>
        <View style={tw`mt-12.75 flex-row items-center`}>
          <TagsList selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
        </View>
        <View style={tw`mt-6 flex-1 pb-15`}>
          <FlatList
            contentContainerStyle={tw``}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListFooterComponent={renderFooter}
            onEndReached={({ distanceFromEnd }) => {
              if (distanceFromEnd >= 0.8) {
                console.log('fetchMoreData fired because the distanceFromEnd is', distanceFromEnd);
                fetchMoreData();
              }
            }}
            refreshing={isLoading}
            onRefresh={refreshData}
            onEndReachedThreshold={0.5}
            extraData={selectedId}
          />
        </View>
      </View>
    </BaseScreenLayout>
  );
}
