import { Icon } from '@rneui/base';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

import { LoadingSpinner, Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';
import { useFetch } from '@jl/hooks';
import { HeaderBackButton } from '@jl/navigation';
import { NoteEncryption, NoteService } from '@jl/services';
import { useSelector } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { MenuBottomSheet } from './components/MenuBottomSheet';
import { PINCheckModal } from './components/PINCheckModal';
import { TagsList } from './components/TagsList';

export function PreviewNoteScreen({ route }) {
  const { noteId } = route.params.params;
  const [decryptedNote, setDecryptedNote] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const { recoveryKey, salt } = useSelector(state => state.encryptionStore);
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

  const handleNoteEncryption = async () => {
    console.log('recoveryKey', recoveryKey);
    if (recoveryKey === '') {
      setModalVisible(true);
    } else {
      await NoteService.noteEncryption(noteId, noteData.body, recoveryKey);
    }
  };

  const handleMenuBottomSheet = () => {
    MenuBottomSheetMethodsRef.current?.open();
  };

  const renderContent = () => (
    <>
      <TagsList tags={noteData?.tags} />
      <View style={tw`mb-3`}>
        <Text variant={TextVariant.Title2}>{noteData?.title}</Text>
      </View>
      <Text variant={TextVariant.Body2Regular}>{noteData?.isEncrypted ? decryptedNote : noteData?.body}</Text>
    </>
  );
  console.log('noteData', noteData?.tags);
  return (
    <BaseScreenLayout>
      <View style={[tw`mx-5 h-full pb-10`]}>
        <View style={tw`justify-between flex-row items-center mb-3`}>
          <HeaderBackButton />
          <Text variant={TextVariant.Title2} color={Color.Neutral.JL500} textAlign={TextAlignment.Center}>
            {noteData?.title}
          </Text>
          <View style={tw`justify-between flex-row gap-3 items-center relative`}>
            {salt !== '' && (
              <Icon
                type="feather"
                name={noteData?.isEncrypted ? 'unlock' : 'lock'}
                size={25}
                onPress={!isLoading && handleNoteEncryption}
                color={isLoading && Color.Neutral.JL200}
              />
            )}
            <Icon
              type="feather"
              name="more-vertical"
              size={25}
              onPress={!isLoading && handleMenuBottomSheet}
              color={isLoading && Color.Neutral.JL200}
            />
          </View>
        </View>
        {isLoading ? <LoadingSpinner size="large" color={Color.Primary.Jl500} /> : renderContent()}
      </View>
      <PINCheckModal
        isModalVisible={isModalVisible}
        toggleModal={() => setModalVisible(state => !state)}
        noteId={noteId}
        note={noteData?.body}
      />
      <Portal>
        <MenuBottomSheet
          ref={MenuBottomSheetMethodsRef}
          noteId={noteId}
          body={noteData?.body}
          isEncrypted={noteData?.isEncrypted}
          isFavourite={noteData?.isFavourite}
        />
      </Portal>
    </BaseScreenLayout>
  );
}
