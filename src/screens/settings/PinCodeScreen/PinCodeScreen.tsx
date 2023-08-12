import { Icon } from '@rneui/base';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import ReactNativePinView from 'react-native-pin-view';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Route, TextAlignment, TextVariant } from '@jl/constants';
import { EncryptionService, NavigationService } from '@jl/services';
import { useDispatch, useSelector } from '@jl/stores';
import { getCurrentTimestamp } from '@jl/utils';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

export function PinCodeScreen({ route }) {
  const { pinExists } = route.params.params;
  const dispatch = useDispatch();

  const { salt, recoveryKey } = useSelector(state => state.encryptionStore);
  const pinView = useRef(null);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [, setIsIncorrectPin] = useState(false);

  const PINVerification = () => {
    if (pinExists) {
      const derivedKey = EncryptionService.generatePinDerivedKey(enteredPin, salt);
      const decryptedRecoveryKey = EncryptionService.decryptRecoveryKey(recoveryKey, derivedKey);

      if (decryptedRecoveryKey) {
        const currentTimestamp = getCurrentTimestamp();
        dispatch.encryptionStore.setLastAccessedHiddenNotesAt(currentTimestamp);

        NavigationService.navigate(Route.HiddenNotes);
      } else {
        setIsIncorrectPin(true);
      }
    } else {
      NavigationService.navigate(Route.ConfirmPinCode, { pinCode: enteredPin });
    }
  };

  useEffect(() => {
    if (enteredPin.length > 0) {
      setShowRemoveButton(true);
    } else {
      setShowRemoveButton(false);
    }
    if (enteredPin.length === 4) {
      PINVerification();
    }
  }, [enteredPin]);

  const renderTitles = () => {
    return (
      <View style={tw`mt-12.5`}>
        <Text variant={TextVariant.Title2} textAlign={TextAlignment.Center}>
          {pinExists ? 'Enter you PIN Code' : 'Enter a PIN Code'}
        </Text>
        <Text variant={TextVariant.Body1Regular} textAlign={TextAlignment.Center}>
          {!pinExists ? 'To keep your notes secure' : ''}
        </Text>
      </View>
    );
  };

  return (
    <BaseScreenLayout>
      <View style={tw`border flex-1 justify-center`}>
        <View style={tw`w-20 h-20 rounded-lg mx-auto border-gray-500 border`}></View>
        {renderTitles()}
        <ReactNativePinView
          inputSize={32}
          ref={pinView}
          pinLength={4}
          buttonViewStyle={tw`bg-slate-300`}
          buttonSize={60}
          onValueChange={value => setEnteredPin(value)}
          onButtonPress={key => {
            if (key === 'custom_right') {
              pinView.current.clear();
            }
          }}
          //@ts-ignore
          customRightButton={
            showRemoveButton ? <Icon type="feather" name="delete" size={20} /> : undefined
          }
          style={tw`mt-10.75`}
        />
      </View>
    </BaseScreenLayout>
  );
}
