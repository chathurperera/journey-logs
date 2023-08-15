import { Icon } from '@rneui/base';
import React, { useEffect, useRef, useState } from 'react';
import { Image, View } from 'react-native';
import ReactNativePinView from 'react-native-pin-view';

import { images } from '@jl/assets';
import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextAlignment, TextVariant } from '@jl/constants';
import { AccountService, EncryptionService, NavigationService } from '@jl/services';
import { useDispatch, useSelector } from '@jl/stores';
import { getCurrentTimestamp } from '@jl/utils';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

export function PinCodeScreen({ route }) {
  const { pinExists } = route.params.params;
  const dispatch = useDispatch();

  const { salt } = useSelector(state => state.encryptionStore);
  const { userId } = useSelector(state => state.userStore.userData);

  const pinView = useRef(null);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [, setIsIncorrectPin] = useState(false);

  const PINVerification = async () => {
    if (pinExists) {
      const { encryptedRecoveryKey } = await AccountService.getMe(userId);
      const { isValidPIN } = await EncryptionService.verifyOldPIN(enteredPin, salt, encryptedRecoveryKey);

      if (isValidPIN) {
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
        <Text variant={TextVariant.Title2} textAlign={TextAlignment.Center} color={Color.Neutral.JL600}>
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
          buttonAreaStyle={tw`px-6`}
          inputAreaStyle={tw`mb-6 mt-3`}
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
