/* eslint-disable @typescript-eslint/no-use-before-define */
import firestore from '@react-native-firebase/firestore';
import MasonryList from '@react-native-seoul/masonry-list';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { TextAlignment, TextVariant } from '@jl/constants';
import { useFirestorePagination } from '@jl/hooks';
import { NoteData } from '@jl/models';
import { useSelector } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { LoadingView } from './components/LoadingView';
import { NoteCard } from './components/NoteCard';
import { TagsList } from './components/TagsList';

export function HomeScreen() {
  const { userId } = useSelector(state => state.userStore.userData);

  const [, setSelectedId] = useState<string>();
  const [selectedTag, setSelectedTag] = useState('All');

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

  const ListEmptyComponent = () => (
    <Text variant={TextVariant.Body2SemiBold} textAlign={TextAlignment.Center}>
      {!isLoading ? 'No notes available. Start adding notes!' : ''}
    </Text>
  );

  const RenderFooterComponent = () => (
    <Text variant={TextVariant.Body2SemiBold} textAlign={TextAlignment.Center}>
      {!isLoading && isEndReached ? 'No more notes to load.' : ''}
    </Text>
  );

  const renderItem = useCallback(
    ({ item }: { item: NoteData }) => <NoteCard {...item} onPress={() => setSelectedId(item.id)} />,
    [],
  );

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
          <MasonryList
            data={data}
            keyExtractor={item => item.id}
            style={tw`gap-4`}
            numColumns={2}
            loading={isLoading}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            refreshing={isFetchingMore}
            onRefresh={refreshData}
            ListFooterComponent={<RenderFooterComponent />}
            LoadingView={<LoadingView />}
            ListEmptyComponent={<ListEmptyComponent />}
            onEndReachedThreshold={0.1}
            onEndReached={() => fetchMoreData()}
          />
        </View>
      </View>
    </BaseScreenLayout>
  );
}
