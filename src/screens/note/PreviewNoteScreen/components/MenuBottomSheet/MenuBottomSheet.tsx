import { Icon } from '@rneui/base';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Pressable, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';
import { NavigationService, NoteService, PDFService } from '@jl/services';
import { useSelector } from '@jl/stores';

interface MenuBottomSheetProps {
  noteId: string;
  body: string;
  title: string;
  isEncrypted: boolean;
  isFavourite: boolean;
  toggleEditingMode: () => void;
}

export const MenuBottomSheet = forwardRef(function MenuBottomSheet(
  { noteId, isEncrypted, isFavourite, body, title, toggleEditingMode }: MenuBottomSheetProps,
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

  const handleNoteExport = async () => {
    const payload = {
      fileName: title,
      directory: 'Documents',
      html: body,
    };

    await PDFService.createPDF(payload);
  };

  const handleNoteEncryption = async () => {
    await NoteService.noteEncryption(noteId, body, recoveryKey);
    ModalizeRef.current?.close();
    setTimeout(() => {
      NavigationService.goBack();
    }, 800);
  };

  const handleNoteDeletion = async () => {
    await NoteService.deleteNote(noteId);
    ModalizeRef.current?.close();
    setTimeout(() => {
      NavigationService.goBack();
    }, 800);
  };

  const handleNoteFavouriteStateToggle = async () => {
    if (isFavourite) {
      await NoteService.removeFromFavourites(noteId);
    } else {
      await NoteService.addToFavourites(noteId);
    }
    ModalizeRef.current?.close();
  };

  const handleEditNoteMode = () => {
    toggleEditingMode();
    ModalizeRef.current?.close();
  };

  return (
    <Modalize ref={ModalizeRef} adjustToContentHeight>
      <View style={tw`px-4 py-6 `}>
        <View style={tw`border-b-[${Color.Neutral.JL100}] border-b pb-4 mb-2`}>
          <Text variant={TextVariant.Body2SemiBold} textAlign={TextAlignment.Center}>
            Manage note
          </Text>
        </View>
        <Pressable onPress={handleEditNoteMode} style={tw` py-3 px-4 flex-row items-center gap-2 `}>
          <View style={tw`justify-center p-2 rounded-md bg-[${Color.Secondary.JL50}] mr-1`}>
            <Icon type="feather" name="edit" size={25} color={Color.Primary.Jl500} />
          </View>
          <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL900}>
            Edit note
          </Text>
        </Pressable>
        <Pressable onPress={handleNoteExport} style={tw` py-3 px-4 flex-row items-center gap-2 `}>
          <View style={tw`justify-center p-2 rounded-md bg-[${Color.Secondary.JL50}] mr-1`}>
            <Icon type="ant-design" name="export" size={25} color={Color.Primary.Jl500} />
          </View>
          <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL900}>
            Export note as PDF
          </Text>
        </Pressable>
        <Pressable onPress={handleNoteFavouriteStateToggle} style={tw` py-3 px-4 flex-row items-center gap-2 `}>
          <View style={tw`justify-center p-2 rounded-md bg-[${Color.Secondary.JL50}] mr-1`}>
            <Icon type="ant-design" name={isFavourite ? 'heart' : 'hearto'} size={25} color={Color.Primary.Jl500} />
          </View>
          <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL900}>
            {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
          </Text>
        </Pressable>
        {recoveryKey !== '' && (
          <Pressable onPress={handleNoteEncryption} style={tw` py-3 px-4 flex-row items-center gap-2 `}>
            <View style={tw`justify-center p-2 rounded-md bg-[${Color.Secondary.JL50}] mr-1`}>
              <Icon type="feather" name={isEncrypted ? 'unlock' : 'lock'} size={25} color={Color.Primary.Jl500} />
            </View>
            <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL900}>
              {isEncrypted ? 'Unlock note' : 'Lock note'}
            </Text>
          </Pressable>
        )}
        <Pressable onPress={handleNoteDeletion} style={tw` py-3 px-4 flex-row items-center gap-2 mt-3`}>
          <View style={tw`justify-center p-2 rounded-md bg-[${Color.Secondary.JL50}] mr-1`}>
            <Icon type="feather" name="trash-2" color={Color.Warning.JL500} size={25} />
          </View>
          <Text variant={TextVariant.Body1SemiBold} color={Color.Warning.JL800}>
            Delete Note
          </Text>
        </Pressable>
      </View>
    </Modalize>
  );
});
