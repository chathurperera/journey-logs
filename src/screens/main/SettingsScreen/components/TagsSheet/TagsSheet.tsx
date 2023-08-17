import { Icon } from '@rneui/base';
import { Button } from '@rneui/themed';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { TextInput, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextVariant } from '@jl/constants';

export const TagsSheet = forwardRef(function TagsSheet(props, ref) {
  const ModalizeRef = useRef<Modalize>(null);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        ModalizeRef.current?.open();
      },
    }),
    [],
  );

  const tagsList = ['#FitnessGoals', '#Recipes', '#Milestones', '#DailyJournal', '#TravelPlans', '#Meetings'];

  const renderPillsList = () => {
    return tagsList.map(tag => (
      <View key={tag} style={tw`border border-[${Color.Neutral.JL200}] rounded-lg p-2 gap-3 flex-row items-center`}>
        <Text variant={TextVariant.Body1SemiBold}>{tag}</Text>
        <Icon name="trash" type="feather" size={23} color={Color.Warning.JL700} />
      </View>
    ));
  };

  return (
    <Modalize ref={ModalizeRef} adjustToContentHeight>
      <View style={tw`p-6 flex-1`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text variant={TextVariant.Heading3SemiBold}>Add new tag</Text>
          <Button
            size="md"
            title={'Create'}
            buttonStyle={tw`bg-[${Color.Primary.Jl500}] rounded-md px-11`}
            titleStyle={tw`text-[${Color.Neutral.white}]`}
            disabledStyle={tw`bg-[${Color.Primary.Jl200}]`}
          />
        </View>
        <View style={tw`bg-[${Color.Neutral.JL50}] p-5 mt-6 rounded-lg mb-5`}>
          <TextInput placeholder="Enter tag name" style={tw`text-base`} />
        </View>
        <View>
          <Text variant={TextVariant.Heading3SemiBold}>Available tags</Text>
          <View style={tw`flex-row flex-wrap pt-3 gap-4`}>{renderPillsList()}</View>
        </View>
      </View>
    </Modalize>
  );
});
