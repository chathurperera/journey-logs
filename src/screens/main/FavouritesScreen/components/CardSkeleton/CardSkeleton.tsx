import { Skeleton } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

import { tw } from '@jl/config';
import { Color } from '@jl/constants';

export function CardSkeleton() {
  return (
    <View style={tw`border-neutral-300 border mb-4 rounded-2.5 px-2.8 py-4 bg-[${Color.Neutral.white}]`}>
      <Skeleton width={300} height={25} style={tw`mb-3 rounded-md`} />
      <Skeleton width={100} height={15} />
    </View>
  );
}
