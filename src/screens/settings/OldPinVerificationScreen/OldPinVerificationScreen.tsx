import { Icon } from '@rneui/base';
import React, { useEffect, useRef, useState } from 'react';
import { Image, View } from 'react-native';
import ReactNativePinView from 'react-native-pin-view';

import { images } from '@jl/assets';
import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextAlignment, TextVariant } from '@jl/constants';
import { AccountService, EncryptionService, NavigationService } from '@jl/services';
import { useSelector } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

export function OldPinVerificationScreen() {
  const { userId } = useSelector(state => state.userStore.userData);
  const { salt } = useSelector(state => state.encryptionStore);

  const pinView = useRef(null);

  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');

  const [oldPINVerificationFailed, setOldPINVerificationFailed] = useState(false);

  const verifyPIN = async () => {
    const { recoveryKey: encryptedRecoveryKey } = await AccountService.getMe(userId);
    const { isValidPIN, masterKey } = await EncryptionService.verifyOldPIN(enteredPin, salt, encryptedRecoveryKey);

    if (isValidPIN) {
      NavigationService.navigate(Route.ChangePinCode, {
        oldPIN: enteredPin,
        masterKey: masterKey,
      });
    } else {
      setOldPINVerificationFailed(true);
    }
  };

  useEffect(() => {
    setOldPINVerificationFailed(false);

    if (enteredPin.length > 0) {
      setShowRemoveButton(true);
    } else {
      setShowRemoveButton(false);
    }

    if (enteredPin.length === 4) {
      verifyPIN();
    }
  }, [enteredPin]);

  const renderTitles = () => {
    return (
      <View style={tw`mt-12.5`}>
        <Text
          variant={TextVariant.Heading3Regular}
          textAlign={TextAlignment.Center}
          color={oldPINVerificationFailed ? Color.Warning.JL700 : Color.Neutral.JL900}>
          {oldPINVerificationFailed ? 'Invalid PIN' : 'Provide Your Old PIN'}
        </Text>
        <Text variant={TextVariant.Body1Regular} textAlign={TextAlignment.Center} color={Color.Warning.JL500}>
          {oldPINVerificationFailed ? 'Please try again' : ''}
        </Text>
      </View>
    );
  };

  return (
    <BaseScreenLayout>
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
          inputAreaStyle={tw`mb-6 mt-3`}
          buttonAreaStyle={tw`px-6`}
          // inputAreaStyle={tw`mb-10`}
          inputViewStyle={tw`w-5 h-5`}
          inputViewEmptyStyle={tw`bg-[${Color.Neutral.JL50}]`}
          onValueChange={value => setEnteredPin(value)}
          onButtonPress={key => {
            if (key === 'custom_right') {
              pinView.current.clear();
            }
          }}
          //@ts-ignore
          customRightButton={
            showRemoveButton ? <Icon type="feather" name="delete" size={30} color={Color.Neutral.JL500} /> : undefined
          }
        />
      </View>
    </BaseScreenLayout>
  );
}
