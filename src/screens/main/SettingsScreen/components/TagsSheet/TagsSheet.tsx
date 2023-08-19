import { Icon } from '@rneui/base';
import { Button } from '@rneui/themed';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';
import { TagsService } from '@jl/services';
import { useSelector } from '@jl/stores';

export const TagsSheet = forwardRef(function TagsSheet(props, ref) {
  const ModalizeRef = useRef<Modalize>(null);
  const { userId } = useSelector(state => state.userStore.userData);

  const [enteredTag, setEnteredTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tagsList, setTagsList] = useState(['']);
  const [isTagsFetching, setIsTagsFetching] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        ModalizeRef.current?.open();
      },
    }),
    [],
  );

  const getTags = async () => {
    setIsTagsFetching(true);
    const tags = await TagsService.getAllTags(userId);
    setIsTagsFetching(false);
    setTagsList(tags);
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleTagDeletion = async (tagToDelete: string) => {
    try {
      await TagsService.removeUserTagAndUpdateNotes(userId, tagToDelete);
      const updatedTags = tagsList.filter(tag => tag !== tagToDelete);
      setTagsList(updatedTags);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleCreateTag = async () => {
    try {
      setIsLoading(true);
      await TagsService.createTag(userId, enteredTag);
      setTagsList(prevState => [...prevState, enteredTag]);
      setEnteredTag('');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const renderEmptyList = () => (
    <View style={tw`mx-auto my-2`}>
      <View style={tw`mb-2`}>
        <Text variant={TextVariant.Heading3SemiBold} textAlign={TextAlignment.Center}>
          Nothing here yet{' '}
        </Text>
      </View>
      <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Center}>
        Looks like you haven't added any tags
      </Text>
    </View>
  );

  const renderPillsList = () => {
    return tagsList?.map(tag => (
      <Pressable
        onPress={() => handleTagDeletion(tag)}
        key={tag}
        style={tw`border border-[${Color.Neutral.JL200}] rounded-lg p-2 gap-3 flex-row items-center`}>
        <Text variant={TextVariant.Body1SemiBold}>{tag}</Text>
        <Icon name="trash" type="feather" size={23} color={Color.Warning.JL700} />
      </Pressable>
    ));
  };

  return (
    <Modalize ref={ModalizeRef} adjustToContentHeight>
      <View style={tw`p-6  pb-8 flex-1`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text variant={TextVariant.Body1SemiBold} textTransform="uppercase" color={Color.Neutral.JL300}>
            Add new tag
          </Text>
          <Button
            size="md"
            title={'Create'}
            loading={isLoading}
            disabled={!enteredTag}
            buttonStyle={tw`bg-[${Color.Primary.Jl500}] rounded-md px-11`}
            titleStyle={tw`text-[${Color.Neutral.white}]`}
            disabledStyle={tw`bg-[${Color.Primary.Jl300}]`}
            onPress={handleCreateTag}
            disabledTitleStyle={tw`text-[${Color.Neutral.white}]`}
          />
        </View>
        <View style={tw`bg-[${Color.Neutral.JL50}] p-5 mt-6 rounded-lg mb-5`}>
          <TextInput
            placeholder="Enter tag name"
            style={tw`text-base`}
            onChangeText={setEnteredTag}
            value={enteredTag}
          />
        </View>
        <Text variant={TextVariant.Body1SemiBold} textTransform="uppercase" color={Color.Neutral.JL300}>
          Available tags
        </Text>
        <View style={tw`flex-row flex-wrap pt-3 gap-4`}>
          {renderPillsList()}
          {!isTagsFetching && tagsList?.length === 0 && renderEmptyList()}
        </View>
      </View>
    </Modalize>
  );
});
