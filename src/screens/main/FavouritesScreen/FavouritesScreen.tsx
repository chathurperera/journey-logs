import { Icon } from '@rneui/base';
import { Input } from '@rneui/themed';
import React from 'react';
import { FlatList, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';
import { useFetch } from '@jl/hooks';
import { NoteData } from '@jl/models';
import { NoteService } from '@jl/services';
import { useSelector } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { CardSkeleton } from './components/CardSkeleton';
import { FavouritesCard } from './components/FavouritesCard';

export function FavouritesScreen() {
  const renderItem = ({ item }: { item: NoteData }) => {
    return <FavouritesCard {...item} />;
  };
  const { userId } = useSelector(state => state.userStore);

  const { isLoading, data } = useFetch(() => NoteService.getFavourites(userId));

  const renderSkeletonLoaders = () => (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );

  const renderEmptyList = () => (
    <>
      <View style={tw`mb-3 mt-10`}>
        <Text variant={TextVariant.Heading3SemiBold} textAlign={TextAlignment.Center}>
          Nothing here yet
        </Text>
      </View>
      <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Center}>
        Looks like you don't have any favourites at the moment
      </Text>
    </>
  );

  return (
    <BaseScreenLayout wrapWithScrollView={false}>
      <View style={tw`mx-5 flex-1`}>
        <Text variant={TextVariant.Title2} textAlign={TextAlignment.Center}>
          Favourites
        </Text>
        <Input
          placeholder="Search your favourites"
          rightIcon={<Icon name="search" type="feather" size={20} />}
          inputContainerStyle={tw`border-[${Color.Neutral.JL50}] border-[1px] px-2 rounded-2 mt-5`}
          inputStyle={tw`px-2.5 text-[15px] font-Inter`}
          containerStyle={tw`px-0`}
        />
        {isLoading && renderSkeletonLoaders()}
        {data?.length === 0 && renderEmptyList()}
        <FlatList
          contentContainerStyle={tw``}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.5}
          // extraData={selectedId}
        />
      </View>
    </BaseScreenLayout>
  );
}
