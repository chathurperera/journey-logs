import React from 'react';
import { ActivityIndicator, ColorValue } from 'react-native';

import { Color } from '@jl/constants';

export interface LoadingSpinnerProps {
  color?: ColorValue;
  size?: 'small' | 'large';
}

export function LoadingSpinner({
  color = Color.Primary.Jl150,
  size = 'large',
}: LoadingSpinnerProps) {
  return <ActivityIndicator size={size} animating={true} color={color} />;
}
