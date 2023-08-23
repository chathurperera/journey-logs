import { Icon } from '@rneui/base';
import React, { useEffect, useRef, useState } from 'react';
import { Image, View } from 'react-native';
import ReactNativePinView from 'react-native-pin-view';

import { images } from '@jl/assets';
import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextAlignment, TextVariant } from '@jl/constants';
import { NavigationService, ToastService } from '@jl/services';
import { useDispatch, useSelector } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

const customRightButton = () => (
  <View style={tw`gap-1`}>
    <Icon type="feather" name="delete" size={30} color={Color.Neutral.JL500} />
    <Text variant={TextVariant.Label1Regular} textAlign={TextAlignment.Center} color={Color.Neutral.JL500}>
      DELETE
    </Text>
  </View>
);

export function ConfirmPinCodeScreen({ route }) {
  const { pinCode } = route.params.params;
  const { userId } = useSelector(state => state.userStore.userData);

  const dispatch = useDispatch();

  const pinView = useRef(null);

  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinCodeMisMatch, setPinCodeMisMatch] = useState(false);

  useEffect(() => {
    setPinCodeMisMatch(false);

    if (enteredPin.length > 0) {
      setShowRemoveButton(true);
    } else {
      setShowRemoveButton(false);
    }

    if (enteredPin === pinCode) {
      try {
        dispatch.encryptionStore.createNewPIN({ PIN: pinCode, userId: userId });
        ToastService.success('Success', 'PIN created successfully');

        NavigationService.navigate(Route.HomeTab);
      } catch (error) {
        ToastService.error('Failed', 'PIN creation unsuccessful');
      }
    } else if (enteredPin.length === 4 && pinCode !== enteredPin) {
      setPinCodeMisMatch(true);
    }
  }, [enteredPin]);

  const renderTitles = () => {
    return (
      <View style={tw`mt-12.5`}>
        <Text
          variant={TextVariant.Heading3Regular}
          textAlign={TextAlignment.Center}
          color={pinCodeMisMatch ? Color.Warning.JL700 : Color.Neutral.JL900}>
          {pinCodeMisMatch ? 'Your entries did not match' : 'Confirm your PIN Code'}
        </Text>
        <Text
          variant={TextVariant.Body1Regular}
          textAlign={TextAlignment.Center}
          color={pinCodeMisMatch ? Color.Warning.JL500 : Color.Neutral.JL900}>
          {pinCodeMisMatch ? 'Please try again' : ''}
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
          inputAreaStyle={tw`mb-12 mt-3 `}
          buttonAreaStyle={tw`px-6`}
          inputViewStyle={tw`w-4.2 h-4.2`}
          inputViewEmptyStyle={tw`bg-[${Color.Neutral.white}] border`}
          onValueChange={value => setEnteredPin(value)}
          onButtonPress={key => {
            if (key === 'custom_right') {
              pinView.current.clear();
            }
          }}
          //@ts-ignore
          customRightButton={showRemoveButton ? customRightButton() : undefined}
          style={tw``}
        />
      </View>
    </BaseScreenLayout>
  );
}
