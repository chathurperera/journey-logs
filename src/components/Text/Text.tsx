import React, { PropsWithChildren } from 'react';
import { GestureResponderEvent, Text as RNText } from 'react-native';

import { Color, Colors, TextAlignment, TextVariant } from '@jl/constants';

import { getAppTextStyles } from './Text.config';

interface TextProps {
  color?: Colors;
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  textAlign?: TextAlignment;
  underline?: boolean;
  variant: TextVariant;
}

export function Text({
  underline,
  children,
  variant,
  textAlign = TextAlignment.Left,
  onPress,
  color = Color.Primary.Jl100,
}: PropsWithChildren<TextProps>) {
  let textStyles = getAppTextStyles(variant);

  if (underline) {
    textStyles += ' underline';
  }

  textStyles += ` text-${textAlign} text-${color}`;

  return (
    <RNText onPress={onPress} className={`${textStyles}`}>
      {children}
    </RNText>
  );
}
