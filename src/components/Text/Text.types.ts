import { GestureResponderEvent, Text } from 'react-native';

import { Colors, TextAlignment, TextVariant } from '@jl/constants';

type RNTextProps = React.ComponentProps<typeof Text>;

export type WithRNTextProps = Pick<RNTextProps, 'testID' | 'numberOfLines'>;

export interface AppTextProps extends WithRNTextProps {
  color?: Colors;
  textAlign?: TextAlignment;
  variant: TextVariant;
  underline?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}
