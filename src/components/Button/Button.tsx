/* eslint-disable @typescript-eslint/no-use-before-define */
import { ButtonProps as RNEButtonProps } from '@rneui/themed';
import React from 'react';
import { Button as RNEButton } from 'react-native-elements';

import { tw } from '@jl/config';
import { Color } from '@jl/constants';

interface ButtonProps extends RNEButtonProps {
  backgroundColor?: string;
  testID?: string;
  textColor?: string;
}

export function Button({
  testID,
  title,
  backgroundColor = Color.Neutral.black,
  textColor = Color.Neutral.white,
  onPress,
  loading,
  disabled,
}: ButtonProps) {
  return (
    <RNEButton
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      title={title}
      buttonStyle={[{ backgroundColor: backgroundColor }, tw`rounded-2.5 py-3`]}
      titleStyle={{ color: textColor }}
      loading={loading}
    />
  );
}
