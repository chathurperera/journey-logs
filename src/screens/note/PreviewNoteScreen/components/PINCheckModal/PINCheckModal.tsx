import { Input } from '@rneui/themed';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import Modal from 'react-native-modal';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';
import { EncryptionService, NoteService } from '@jl/services';
import { useDispatch, useSelector } from '@jl/stores';

export function PINCheckModal({ isModalVisible, toggleModal, noteId, note }) {
  const { salt, encryptedRecoveryKey } = useSelector(state => state.encryptionStore);
  const [enteredPIN, setEnteredPIN] = useState('');
  const dispatch = useDispatch();
  const [invalidPIN, setInvalidPIN] = useState(false);

  const handleVerification = async () => {
    const { isValidPIN, recoveryKey } = await EncryptionService.verifyOldPIN(enteredPIN, salt, encryptedRecoveryKey);
    if (isValidPIN) {
      dispatch.encryptionStore.setRecoveryKey(recoveryKey);
      toggleModal();
      await NoteService.noteEncryption(noteId, note, recoveryKey);
    } else {
      setInvalidPIN(true);
    }
  };

  return (
    <Modal isVisible={isModalVisible}>
      <View style={tw`bg-[${Color.Neutral.white}] p-12 rounded-2xl`}>
        <Text
          variant={TextVariant.Heading3SemiBold}
          textAlign={TextAlignment.Center}
          color={invalidPIN ? Color.Warning.JL600 : Color.Neutral.JL900}>
          {invalidPIN ? '🚫 Invalid PIN' : 'Enter PIN Code'}
        </Text>
        <Input
          secureTextEntry
          inputMode="numeric"
          maxLength={4}
          onChange={() => invalidPIN && setInvalidPIN(false)}
          onChangeText={setEnteredPIN}
          value={enteredPIN}
          inputContainerStyle={tw`border-[${Color.Tertiary.jl100}] border-[1px] rounded-2 py-1 mt-3`}
          inputStyle={tw`px-2.5 text-[15px] font-Inter`}
        />
        <View style={tw`flex-row gap-2 justify-between items-center`}>
          <Pressable style={tw`bg-[${Color.Neutral.JL350}] rounded-lg px-8 py-4`} onPress={toggleModal}>
            <Text variant={TextVariant.Body2SemiBold} color={Color.Neutral.JL900}>
              Cancel
            </Text>
          </Pressable>
          <Pressable
            style={tw`bg-[${Color.Primary.Jl400}] rounded-lg px-8 py-4`}
            onPress={handleVerification}
            disabled={enteredPIN.length !== 4}>
            <Text variant={TextVariant.Body2SemiBold} color={Color.Primary.Jl50}>
              Submit
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
