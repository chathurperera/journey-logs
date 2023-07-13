import { Icon } from '@rneui/base';
import React from 'react';
import { Pressable, View } from 'react-native';

import { tw } from '@jl/config';

export function CreateNewFolderIcon() {
  return (
    <View style={tw`pl-4`}>
      <Pressable style={tw`w-10 h-10 bg-transparent rounded-full border-[#CECECE] border justify-center`}>
        <Icon type="feather" name="folder-plus" size={20} />
      </Pressable>
    </View>
  );
}
