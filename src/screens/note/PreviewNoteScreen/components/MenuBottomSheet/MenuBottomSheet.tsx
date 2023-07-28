import { Icon } from '@rneui/base';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Pressable } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextVariant } from '@jl/constants';
import { NavigationService, NoteService } from '@jl/services';

interface MenuBottomSheetProps {
  noteId: string;
  isEncrypted: boolean;
}

export const MenuBottomSheet = forwardRef(function MenuBottomSheet(
  { noteId, isEncrypted }: MenuBottomSheetProps,
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

  const handleNoteEncryption = async () => {
    await NoteService.noteEncryption(noteId, !isEncrypted);
    ModalizeRef.current?.close();
  };

  const handleNoteDeletion = async () => {
    await NoteService.deleteNote(noteId);
    ModalizeRef.current?.close();
  };

  return (
    <Modalize ref={ModalizeRef} adjustToContentHeight>
      <Pressable
        onPress={() => NavigationService.navigate(Route.EditNote)}
        style={tw`border-b-[${Color.Primary.Jl150}] p-4 flex-row items-center gap-2 border-b-2`}>
        <Icon type="feather" name="edit" size={25} />
        <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL500}>
          Edit note
        </Text>
      </Pressable>
      <Pressable
        onPress={() => console.log('handle tags create screen navigation')}
        style={tw`border-b-[${Color.Primary.Jl150}] p-4 flex-row items-center gap-2 border-b-2`}>
        <Icon type="feather" name="tag" size={25} />
        <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL500}>
          Add Tags
        </Text>
      </Pressable>
      <Pressable
        onPress={handleNoteEncryption}
        style={tw`border-b-[${Color.Primary.Jl150}] p-4 flex-row items-center gap-2 border-b-2`}>
        <Icon type="feather" name={isEncrypted ? 'unlock' : 'lock'} size={25} />
        <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.JL500}>
          {isEncrypted ? 'Unlock note' : 'Lock note'}
        </Text>
      </Pressable>
      <Pressable
        onPress={handleNoteDeletion}
        style={tw`border-b-[${Color.Primary.Jl150}] p-4 flex-row items-center gap-2`}>
        <Icon type="feather" name="trash-2" color={Color.Warning.JL100} size={25} />
        <Text variant={TextVariant.Body1SemiBold} color={Color.Warning.JL100}>
          Delete Note
        </Text>
      </Pressable>
    </Modalize>
  );
});
