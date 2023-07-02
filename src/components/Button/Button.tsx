/* eslint-disable @typescript-eslint/no-use-before-define */
import { ButtonProps as RNEButtonProps } from '@rneui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as RNEButton } from 'react-native-elements';

import { Color } from '@jl/constants';

interface ButtonProps extends RNEButtonProps {
  backgroundColor?: string;
  textColor?: string;
}

export function Button({ title, backgroundColor = Color.Neutral.black, textColor = Color.Neutral.white, onPress }: ButtonProps) {
  return (
    <RNEButton
      onPress={onPress}
      title={title}
      buttonStyle={[{ backgroundColor: backgroundColor }, styles.buttonStyles]}
      titleStyle={{ color: textColor }}
    />
  );
}

const styles = StyleSheet.create({
  buttonStyles: {
    borderRadius: 5,
    paddingVertical: 11,
  },
});