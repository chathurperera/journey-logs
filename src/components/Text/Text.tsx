import React, { PropsWithChildren } from 'react';
import { Text as RNText } from 'react-native';

import { Color, TextAlignment } from '@jl/constants';

import { getAppTextStyles } from './Text.config';
import { TextProps } from './Text.types';

export function Text({
  underline,
  children,
  variant,
  textAlign = TextAlignment.Left,
  onPress,
  color = Color.Neutral.JL900,
}: PropsWithChildren<TextProps>) {
  let textStyles = getAppTextStyles(variant);

  if (underline) {
    textStyles += ' underline';
  }

  textStyles += ` text-${textAlign}`;
  return (
    <RNText onPress={onPress} style={{ color }} className={`${textStyles}`}>
      {children}
    </RNText>
  );
}
