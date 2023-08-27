import { Icon } from '@rneui/base';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import ReactNativePinView from 'react-native-pin-view';

import { images } from '@jl/assets';
import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextAlignment, TextVariant } from '@jl/constants';
import { EncryptionService, NavigationService, NoteEncryption, ToastService } from '@jl/services';
import { useSelector } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

interface ChangePinCodeScreenProps {
  testID?: string;
}

export function ChangePinCodeScreen({ testID }: ChangePinCodeScreenProps) {
  const pinView = useRef(null);

  const { userId } = useSelector(state => state.userStore);
  const { salt, recoveryKey } = useSelector(state => state.encryptionStore);

  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');

  const generateNewRecoveryKey = async () => {
    try {
      const newEncryptedRecoveryKey = await EncryptionService.generateNewEncryptedRecoveryKey(
        enteredPin,
        salt,
        recoveryKey,
      );
      await NoteEncryption.savePinAndRecoveryKey(userId, salt, newEncryptedRecoveryKey);

      ToastService.success('Success', 'PIN updated successfully');
      NavigationService.navigate(Route.SettingsTab);
    } catch (error) {
      ToastService.error('Error', 'Something went wrong');
    }
  };

  useEffect(() => {
    if (enteredPin.length > 0) {
      setShowRemoveButton(true);
    } else {
      setShowRemoveButton(false);
    }

    if (enteredPin.length === 4) {
      generateNewRecoveryKey();
    }
  }, [enteredPin]);

  const renderTitles = () => {
    return (
      <View style={tw`mt-12.5`}>
        <Text variant={TextVariant.Title2} textAlign={TextAlignment.Center}>
          Enter your New PIN
        </Text>
      </View>
    );
  };

  return (
    <BaseScreenLayout testID={testID}>
      <View style={tw`items-start pl-5`}>
        <Pressable style={tw`py-1`} onPress={() => NavigationService.navigate(Route.SettingsTab)}>
          <Icon type="feather" name="chevron-left" size={30} color={Color.Neutral.JL800} />
        </Pressable>
      </View>
      <View style={tw`flex-1 justify-center`}>
        <View style={tw`flex-row justify-center`}>
          <Image source={images.logo} style={tw`w-20 h-20`} />
        </View>
        {renderTitles()}
        <ReactNativePinView
          inputSize={32}
          ref={pinView}
          pinLength={4}
          buttonViewStyle={tw`bg-[${Color.Neutral.JL50}]`}
          buttonTextStyle={tw`text-[${Color.Neutral.JL900}] text-4xlg font-normal`}
          buttonSize={70}
          inputAreaStyle={tw`mb-12 mt-3 `}
          buttonAreaStyle={tw`px-6`}
          inputViewEmptyStyle={tw`bg-[${Color.Neutral.white}] border`}
          inputViewStyle={tw`w-5 h-5`}
          onValueChange={value => setEnteredPin(value)}
          onButtonPress={key => {
            if (key === 'custom_right') {
              pinView.current.clear();
            }
          }}
          //@ts-ignore
          customRightButton={
            showRemoveButton ? (
              <Icon type="feather" name="delete" size={30} color={Color.Neutral.JL500} />
            ) : undefined
          }
        />
      </View>
    </BaseScreenLayout>
  );
}
