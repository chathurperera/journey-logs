import { Icon } from '@rneui/base';
import React from 'react';
import { View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextVariant } from '@jl/constants';
import { HeaderBackButton } from '@jl/navigation';
import { NavigationService } from '@jl/services';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

export function PreviewNoteScreen() {
  const handleEditScreenNavigation = () => {
    NavigationService.navigate(Route.EditNote);
  };

  return (
    <BaseScreenLayout>
      <View style={[tw`mx-5 h-full pb-10`]}>
        <View style={tw`justify-between flex-row items-center mb-3`}>
          <HeaderBackButton />
          <Text variant={TextVariant.Title2} color={Color.Neutral.JL500}>
            Some title
          </Text>
          {/* TODO:: replace with a proper button variant */}
          <View style={tw`justify-between flex-row gap-3 items-center relative`}>
            <Icon type="feather" name="edit" size={25} onPress={handleEditScreenNavigation} />
            <Icon type="feather" name="more-vertical" size={25} />
          </View>
        </View>
        <View style={tw`mb-3`}>
          <Text variant={TextVariant.Heading1Regular}>Some title</Text>
        </View>
        <Text variant={TextVariant.Body1Regular}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius sapien in lorem
          pellentesque ullamcorper. Vestibulum maximus mattis luctus. In bibendum sit amet lacus
          tristique ultrices. Proin rhoncus orci vel augue interdum, eget pellentesque erat aliquet.
          Maecenas imperdiet elit nec sapien mollis dictum. Suspendisse ac est erat. Suspendisse
          porttitor rutrum purus, et vestibulum tellus faucibus eleifend. Aliquam auctor vestibulum
          urna sed ultrices.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius
          sapien in lorem pellentesque ullamcorper. Vestibulum maximus mattis luctus. In bibendum
          sit amet lacus tristique ultrices. Proin rhoncus orci vel augue interdum, eget
          pellentesque erat aliquet. Maecenas imperdiet elit nec sapien mollis dictum. Suspendisse
          ac est erat. Suspendisse porttitor rutrum purus, et vestibulum tellus faucibus eleifend.
          Aliquam auctor vestibulum urna sed ultrices.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Vivamus varius sapien in lorem pellentesque ullamcorper. Vestibulum
          maximus mattis luctus. In bibendum sit amet lacus tristique ultrices. Proin rhoncus orci
          vel augue interdum, eget pellentesque erat aliquet. Maecenas imperdiet elit nec sapien
          mollis dictum. Suspendisse ac est erat. Suspendisse porttitor rutrum purus, et vestibulum
          tellus faucibus eleifend. Aliquam auctor vestibulum urna sed ultrices.
        </Text>
      </View>
    </BaseScreenLayout>
  );
}
