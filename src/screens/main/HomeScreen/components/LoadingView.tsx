import { Skeleton } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

import { tw } from '@jl/config';
import { Color } from '@jl/constants';

export function LoadingView() {
  return (
    <View style={tw`flex-row gap-4 flex-wrap`}>
      <View
        style={tw`border mb-4 rounded-2.5 px-2.8 pt-2.8 pb-2.8  bg-[${Color.Neutral.white}] relative w-45 
       border-gray-200  `}>
        <Skeleton height={20} width={100} style={tw`mb-2`} />
        <Skeleton height={10} width={40} style={tw`mb-4`} />
        <Skeleton height={10} width={40} />
      </View>
      <View
        style={tw`border mb-4 rounded-2.5 px-2.8 pt-2.8 pb-2.8  bg-[${Color.Neutral.white}] relative w-45 
       border-gray-200  `}>
        <Skeleton height={20} width={100} style={tw`mb-2`} />
        <Skeleton height={10} width={40} style={tw`mb-4`} />
        <Skeleton height={10} width={40} />
      </View>
      <View
        style={tw`border mb-4 rounded-2.5 px-2.8 pt-2.8 pb-2.8  bg-[${Color.Neutral.white}] relative w-45 
       border-gray-200  `}>
        <Skeleton height={20} width={100} style={tw`mb-2`} />
        <Skeleton height={10} width={40} style={tw`mb-4`} />
        <Skeleton height={10} width={40} />
      </View>
      <View
        style={tw`border mb-4 rounded-2.5 px-2.8 pt-2.8 pb-2.8  bg-[${Color.Neutral.white}] relative w-45 
       border-gray-200  `}>
        <Skeleton height={20} width={100} style={tw`mb-2`} />
        <Skeleton height={10} width={40} style={tw`mb-4`} />
        <Skeleton height={10} width={40} />
      </View>
      <View
        style={tw`border mb-4 rounded-2.5 px-2.8 pt-2.8 pb-2.8  bg-[${Color.Neutral.white}] relative w-45 
       border-gray-200  `}>
        <Skeleton height={20} width={100} style={tw`mb-2`} />
        <Skeleton height={10} width={40} style={tw`mb-4`} />
        <Skeleton height={10} width={40} />
      </View>
      <View
        style={tw`border mb-4 rounded-2.5 px-2.8 pt-2.8 pb-2.8  bg-[${Color.Neutral.white}] relative w-45 
       border-gray-200  `}>
        <Skeleton height={20} width={100} style={tw`mb-2`} />
        <Skeleton height={10} width={40} style={tw`mb-4`} />
        <Skeleton height={10} width={40} />
      </View>
      <View
        style={tw`border mb-4 rounded-2.5 px-2.8 pt-2.8 pb-2.8  bg-[${Color.Neutral.white}] relative w-45 
       border-gray-200  `}>
        <Skeleton height={20} width={100} style={tw`mb-2`} />
        <Skeleton height={10} width={40} style={tw`mb-4`} />
        <Skeleton height={10} width={40} />
      </View>
      <View
        style={tw`border mb-4 rounded-2.5 px-2.8 pt-2.8 pb-2.8  bg-[${Color.Neutral.white}] relative w-45 
       border-gray-200  `}>
        <Skeleton height={20} width={100} style={tw`mb-2`} />
        <Skeleton height={10} width={40} style={tw`mb-4`} />
        <Skeleton height={10} width={40} />
      </View>
    </View>
  );
}
