import { ColorValue, GestureResponderEvent, Text } from 'react-native';

import { TextAlignment, TextVariant } from '@jl/constants';

type RNTextProps = React.ComponentProps<typeof Text>;

export type WithRNTextProps = Pick<RNTextProps, 'testID' | 'numberOfLines' | 'ellipsizeMode'>;

export interface TextProps extends WithRNTextProps {
  color?: ColorValue;
  children: React.ReactNode;
  textAlign?: TextAlignment;
  variant: TextVariant;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
  underline?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}
