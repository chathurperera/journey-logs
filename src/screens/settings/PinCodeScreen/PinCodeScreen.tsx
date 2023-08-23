import { Icon } from '@rneui/base';
import React, { useEffect, useRef, useState } from 'react';
import { Image, View } from 'react-native';
import ReactNativePinView from 'react-native-pin-view';

import { images } from '@jl/assets';
import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextAlignment, TextVariant } from '@jl/constants';
import { HeaderBackButton } from '@jl/navigation';
import { AccountService, EncryptionService, NavigationService } from '@jl/services';
import { useDispatch, useSelector } from '@jl/stores';
import { getCurrentTimestampInSeconds } from '@jl/utils';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

export function PinCodeScreen({ route }) {
  const { pinExists } = route.params.params;
  const dispatch = useDispatch();

  const { salt, failedAttempts } = useSelector(state => state.encryptionStore);
  const { userId } = useSelector(state => state.userStore.userData);

  const pinView = useRef(null);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [isIncorrectPin, setIsIncorrectPin] = useState(false);

  const PINVerification = async () => {
    if (pinExists) {
      const { encryptedRecoveryKey } = await AccountService.getMe(userId);

      const { isValidPIN, recoveryKey } = await EncryptionService.verifyOldPIN(enteredPin, salt, encryptedRecoveryKey);
      dispatch.encryptionStore.setRecoveryKey(recoveryKey);

      const currentTimestamp = getCurrentTimestampInSeconds();

      if (isValidPIN) {
        dispatch.encryptionStore.setLastAccessedHiddenNotesAt(currentTimestamp);

        NavigationService.navigate(Route.HiddenNotes);
      } else {
        setIsIncorrectPin(true);

        if (failedAttempts < 5) {
          dispatch.encryptionStore.incrementFailedAttempts();
        } else {
          dispatch.encryptionStore.resetFailedAttempts();
          dispatch.encryptionStore.setLockoutTimestamp(currentTimestamp);

          NavigationService.navigate(Route.MaxPinCodeAttemptsReached, { remainingSeconds: 300 });
        }
      }
    } else {
      NavigationService.navigate(Route.ConfirmPinCode, { pinCode: enteredPin });
    }
  };

  useEffect(() => {
    if (isIncorrectPin) {
      pinView.current.clearAll();
      setIsIncorrectPin(false);
    }

    if (enteredPin.length > 0) {
      setShowRemoveButton(true);
    } else {
      setShowRemoveButton(false);
    }
    if (enteredPin.length === 4) {
      PINVerification();
    }
  }, [enteredPin]);

  const getMainHeading = () => {
    if (isIncorrectPin) {
      return 'Invalid PIN';
    } else if (pinExists) {
      return 'Enter your PIN Code';
    } else {
      return 'Enter a PIN Code';
    }
  };

  const getSubHeading = () => {
    if (isIncorrectPin) {
      return 'Please try again';
    } else if (!pinExists) {
      return 'To keep your notes secure';
    } else {
      return '';
    }
  };

  const renderTitles = () => {
    return (
      <View style={tw`mt-12.5`}>
        <Text
          variant={TextVariant.Title2}
          textAlign={TextAlignment.Center}
          color={isIncorrectPin ? Color.Warning.JL700 : Color.Neutral.JL900}>
          {getMainHeading()}
        </Text>
        <Text
          variant={TextVariant.Body1Regular}
          textAlign={TextAlignment.Center}
          color={isIncorrectPin ? Color.Warning.JL500 : Color.Neutral.JL900}>
          {getSubHeading()}
        </Text>
      </View>
    );
  };

  return (
    <BaseScreenLayout>
      <View style={tw`flex-1 justify-center mx-5 relative`}>
        <View style={tw`absolute top-0 left-5`}>
          <HeaderBackButton />
        </View>
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
          inputViewStyle={tw`w-4.2 h-4.2`}
          inputViewEmptyStyle={tw`bg-[${Color.Neutral.white}] border`}
          onValueChange={value => setEnteredPin(value)}
          onButtonPress={key => {
            if (key === 'custom_right') {
              pinView.current.clear();
            }
            if (isIncorrectPin) {
              pinView.current.clearAll();
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
