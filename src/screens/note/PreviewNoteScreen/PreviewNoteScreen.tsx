import { Icon } from '@rneui/base';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextVariant } from '@jl/constants';
import { HeaderBackButton } from '@jl/navigation';
import { NavigationService, NoteService } from '@jl/services';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { MenuBottomSheet } from './components/MenuBottomSheet';

export function PreviewNoteScreen({ route }) {
  const { noteId } = route.params.params.params;
  const [noteData, setNoteData] = useState(null);

  const MenuBottomSheetRef = useRef<Modalize>(null);

  const handleEditScreenNavigation = () => {
    NavigationService.navigate(Route.EditNote);
  };

  const handleMenuBottomSheet = () => {
    MenuBottomSheetRef.current?.open();
  };

  const fetchData = async () => {
    const data = await NoteService.getSingleNote(noteId);
    setNoteData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BaseScreenLayout>
      <View style={[tw`mx-5 h-full pb-10`]}>
        <View style={tw`justify-between flex-row items-center mb-3`}>
          <HeaderBackButton />
          <Text variant={TextVariant.Title2} color={Color.Neutral.JL500}>
            {noteData?.title}
          </Text>
          {/* TODO:: replace with a proper button variant */}
          <View style={tw`justify-between flex-row gap-3 items-center relative`}>
            <Icon type="feather" name="edit" size={25} onPress={handleEditScreenNavigation} />
            <Icon type="feather" name="more-vertical" size={25} onPress={handleMenuBottomSheet} />
          </View>
        </View>
        <View style={tw`mb-3`}>
          <Text variant={TextVariant.Heading1Regular}>{noteData?.title}</Text>
        </View>
        <Text variant={TextVariant.Body1Regular}>{noteData?.body}</Text>
      </View>
      <MenuBottomSheet ref={MenuBottomSheetRef} />
    </BaseScreenLayout>
  );
}
