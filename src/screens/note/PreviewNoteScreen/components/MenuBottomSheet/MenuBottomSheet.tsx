import { Icon } from '@rneui/base';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Pressable, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextVariant } from '@jl/constants';
import { NavigationService, NoteService } from '@jl/services';
import { useSelector } from '@jl/stores';

interface MenuBottomSheetProps {
  noteId: string;
  body: string;
  isEncrypted: boolean;
  isFavourite: boolean;
}

export const MenuBottomSheet = forwardRef(function MenuBottomSheet(
  { noteId, isEncrypted, isFavourite, body }: MenuBottomSheetProps,
  ref,
) {
  const ModalizeRef = useRef<Modalize>(null);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        ModalizeRef.current?.open();
      },
    }),
    [],
  );

  const { recoveryKey } = useSelector(state => state.encryptionStore);

  const handleNoteEncryption = async () => {
    await NoteService.noteEncryption(noteId, body, recoveryKey);
    ModalizeRef.current?.close();
  };

  const handleNoteDeletion = async () => {
    await NoteService.deleteNote(noteId);
    ModalizeRef.current?.close();
  };

  const handleNoteFavouriteStateToggle = async () => {
    if (isFavourite) {
      await NoteService.removeFromFavourites(noteId);
    } else {
      await NoteService.addToFavourites(noteId);
    }
    ModalizeRef.current?.close();
  };

  const handleEditNoteNavigation = () => {
    NavigationService.navigate(Route.EditNote, { noteId: noteId });
    ModalizeRef.current?.close();
  };

  return (
    <Modalize ref={ModalizeRef} adjustToContentHeight>
      <View style={tw`px-4 pb-3`}>
        <Pressable
          onPress={handleEditNoteNavigation}
          style={tw`border-b-[${Color.Neutral.JL200}] p-4 px-8 flex-row items-center gap-2 border-b`}>
          <Icon type="feather" name="edit" size={25} />
          <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL900}>
            Edit note
          </Text>
        </Pressable>
        <Pressable
          onPress={handleNoteFavouriteStateToggle}
          style={tw`border-b-[${Color.Neutral.JL200}] p-4 px-8 flex-row items-center gap-2 border-b`}>
          <Icon type="ant-design" name={isFavourite ? 'heart' : 'hearto'} size={25} />
          <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL900}>
            {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
          </Text>
        </Pressable>
        {recoveryKey !== '' && (
          <Pressable
            onPress={handleNoteEncryption}
            style={tw`border-b-[${Color.Neutral.JL200}] p-4 px-8 flex-row items-center gap-2 border-b`}>
            <Icon type="feather" name={isEncrypted ? 'unlock' : 'lock'} size={25} />
            <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL900}>
              {isEncrypted ? 'Unlock note' : 'Lock note'}
            </Text>
          </Pressable>
        )}
        <Pressable
          onPress={handleNoteDeletion}
          style={tw`border-b-[${Color.Neutral.JL200}] p-4 px-8 flex-row items-center gap-2`}>
          <Icon type="feather" name="trash-2" color={Color.Warning.JL500} size={25} />
          <Text variant={TextVariant.Body1SemiBold} color={Color.Warning.JL800}>
            Delete Note
          </Text>
        </Pressable>
      </View>
    </Modalize>
  );
});
