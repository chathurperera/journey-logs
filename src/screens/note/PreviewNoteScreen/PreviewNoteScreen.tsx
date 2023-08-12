import { Icon } from '@rneui/base';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { LoadingSpinner, Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextVariant } from '@jl/constants';
import { useFetch } from '@jl/hooks';
import { HeaderBackButton } from '@jl/navigation';
import { NavigationService, NoteEncryption, NoteService } from '@jl/services';
import { useSelector } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { MenuBottomSheet } from './components/MenuBottomSheet';

export function PreviewNoteScreen({ route }) {
  const { noteId } = route.params.params;
  const [decryptedNote, setDecryptedNote] = useState('');

  const { recoveryKey } = useSelector(state => state.encryptionStore);

  const { data: noteData, isLoading } = useFetch(() => NoteService.getSingleNote(noteId));

  useEffect(() => {
    if (noteData?.isEncrypted) {
      const getEncryptedNote = async () => {
        const note = await NoteEncryption.getDecryptedNote(noteData?.body, recoveryKey);
        setDecryptedNote(note);
      };

      getEncryptedNote();
    }
  }, [isLoading]);

  const MenuBottomSheetMethodsRef = useRef<Modalize>(null);

  const handleEditScreenNavigation = () => {
    NavigationService.navigate(Route.EditNote, { noteId: noteId });
  };

  const handleMenuBottomSheet = () => {
    MenuBottomSheetMethodsRef.current?.open();
  };

  const renderContent = () => (
    <>
      <View style={tw`mb-3`}>
        <Text variant={TextVariant.Heading1Regular}>{noteData?.title}</Text>
      </View>
      <Text variant={TextVariant.Body1Regular}>
        {noteData?.isEncrypted ? decryptedNote : noteData?.body}
      </Text>
    </>
  );

  return (
    <BaseScreenLayout>
      <View style={[tw`mx-5 h-full pb-10`]}>
        <View style={tw`justify-between flex-row items-center mb-3`}>
          <HeaderBackButton />
          <Text variant={TextVariant.Title2} color={Color.Neutral.JL500}>
            {noteData?.title}
          </Text>
          <View style={tw`justify-between flex-row gap-3 items-center relative`}>
            <Icon
              type="feather"
              name="edit"
              size={25}
              onPress={!isLoading && handleEditScreenNavigation}
              color={isLoading && Color.Neutral.JL200}
            />
            <Icon
              type="feather"
              name="more-vertical"
              size={25}
              onPress={!isLoading && handleMenuBottomSheet}
              color={isLoading && Color.Neutral.JL200}
            />
          </View>
        </View>
        {isLoading ? <LoadingSpinner size="large" color={Color.Primary.Jl450} /> : renderContent()}
      </View>
      <MenuBottomSheet
        ref={MenuBottomSheetMethodsRef}
        noteId={noteId}
        body={noteData?.body}
        isEncrypted={noteData?.isEncrypted}
      />
    </BaseScreenLayout>
  );
}
