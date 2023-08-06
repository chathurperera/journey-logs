import { Icon } from '@rneui/base';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import ReactNativePinView from 'react-native-pin-view';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextAlignment, TextVariant } from '@jl/constants';
import { NavigationService } from '@jl/services';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

export function ConfirmPinCodeScreen({ route }) {
  const pinView = useRef(null);
  const { pinCode } = route.params.params;

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
      console.log('matched');
      NavigationService.navigate(Route.HomeTab);
    } else if (enteredPin.length === 4 && pinCode !== enteredPin) {
      setPinCodeMisMatch(true);
    }
  }, [enteredPin]);

  const renderTitles = () => {
    return (
      <View style={tw`mt-12.5`}>
        <Text
          variant={TextVariant.Title2}
          textAlign={TextAlignment.Center}
          color={pinCodeMisMatch && Color.Warning.JL100}>
          {pinCodeMisMatch ? 'Your entries did not match' : 'Confirm your PIN Code'}
        </Text>
        <Text
          variant={TextVariant.Body1Regular}
          textAlign={TextAlignment.Center}
          color={pinCodeMisMatch && Color.Warning.JL100}>
          {pinCodeMisMatch ? 'Please try again' : ''}
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
