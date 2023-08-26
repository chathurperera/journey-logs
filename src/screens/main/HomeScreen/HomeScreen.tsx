/* eslint-disable @typescript-eslint/no-use-before-define */
import firestore from '@react-native-firebase/firestore';
import MasonryList from '@react-native-seoul/masonry-list';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';
import { useFirestorePagination } from '@jl/hooks';
import { NoteData } from '@jl/models';
import { useSelector } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { LoadingView } from './components/LoadingView';
import { NoteCard } from './components/NoteCard';
import { TagsList } from './components/TagsList';

const greetBasedOnTime = (): string => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) return 'Good morning✨';
  if (currentHour < 18) return 'Good afternoon✨';
  return 'Good evening✨';
};

const ListEmptyComponent = (): JSX.Element => (
  <Text variant={TextVariant.Body2SemiBold} textAlign={TextAlignment.Center}>
    'No notes available. Start adding notes!'
  </Text>
);

const RenderFooterComponent = ({
  isLoading,
  isEndReached,
}: {
  isLoading: boolean;
  isEndReached: boolean;
}) => (
  <Text variant={TextVariant.Body2SemiBold} textAlign={TextAlignment.Center}>
    {!isLoading && isEndReached ? 'No more notes to load.' : ''}
  </Text>
);

export function HomeScreen() {
  const { userId, name } = useSelector(state => state.userStore.userData);

  const [, setSelectedId] = useState<string>();
  const [selectedTag, setSelectedTag] = useState('All');
  const pageSize = 10;

  const initialQuery = useMemo(() => {
    let query = firestore()
      .collection('notes')
      .where('userId', '==', userId)
      .where('isEncrypted', '==', false);

    if (selectedTag !== 'All') {
      query = query.where('tags', 'array-contains', selectedTag);
    }
    return query.orderBy('createdAt', 'desc');
  }, [selectedTag]);

  const { data, isLoading, isFetchingMore, isEndReached, fetchMoreData, refreshData } =
    useFirestorePagination(initialQuery, pageSize);

  const renderItem = useCallback(
    ({ item }: { item: NoteData }) => <NoteCard {...item} onPress={() => setSelectedId(item.id)} />,
    [],
  );

  return (
    <BaseScreenLayout wrapWithScrollView={false}>
      <View style={tw`mx-5 pt-5 flex-1`}>
        <View style={tw`w-[300px]`}>
          <Text variant={TextVariant.Heading3Regular} color={Color.Neutral.JL800}>
            {`Hey ${name},`}
          </Text>
          <Text variant={TextVariant.Heading3Regular} color={Color.Neutral.JL800}>
            {greetBasedOnTime()}
          </Text>
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
            ListFooterComponent={
              <RenderFooterComponent isLoading={isLoading} isEndReached={isEndReached} />
            }
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
