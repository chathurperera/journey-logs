import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { FlatList, View } from 'react-native';

import { LoadingSpinner, Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextVariant } from '@jl/constants';
import { useFirestorePagination } from '@jl/hooks';
import { HeaderBackButton } from '@jl/navigation';
import { useSelector } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { HiddenNoteCard } from './components/HiddenNoteCard';

export function HiddenNotesScreen() {
  const { userId } = useSelector(state => state.userStore.userData);

  const pageSize = 10;

  let query = firestore()
    .collection('notes')
    .where('userId', '==', userId)
    .where('isEncrypted', '==', true)
    .orderBy('createdAt', 'desc');

  const { data, isLoading, isFetchingMore, isEndReached, fetchMoreData, refreshData } =
    useFirestorePagination(query, pageSize);

  const renderFooter = () => {
    if (isLoading) return <LoadingSpinner size="large" />;
    if (data.length === 0)
      return <Text variant={TextVariant.Body2SemiBold}>No hidden notes available</Text>;
    if (isFetchingMore) return <LoadingSpinner size="small" />;
    if (isEndReached)
      return <Text variant={TextVariant.Body2SemiBold}>No more notes to load.</Text>;
    return null;
  };

  const renderItem = ({ item }: { item }) => {
    return <HiddenNoteCard {...item} />;
  };

  return (
    <BaseScreenLayout wrapWithScrollView={false}>
      <View style={[tw`mx-5 flex-1 pb-10 bg-white`]}>
        <View style={tw`justify-between flex-row items-center mb-3`}>
          <HeaderBackButton />
          <View style={tw`absolute mx-auto left-0 right-0 flex-row justify-center`}>
            <Text variant={TextVariant.Heading3SemiBold} color={Color.Neutral.JL900}>
              Secured Notes
            </Text>
          </View>
        </View>

        <View style={tw`mt-4 flex-1`}>
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
          />
        </View>
      </View>
    </BaseScreenLayout>
  );
}
