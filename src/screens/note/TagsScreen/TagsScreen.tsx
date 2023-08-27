import { Icon } from '@rneui/base';
import { Button, Input } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';
import { HeaderBackButton } from '@jl/navigation';
import { TagsService } from '@jl/services';
import { useSelector } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { DeleteConfirmationModal } from './components/DeleteConfimationModal';

interface TagsScreenProps {
  testID: string;
}

export function TagsScreen({ testID }: TagsScreenProps) {
  const [enteredTag, setEnteredTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tagsList, setTagsList] = useState(['']);
  const [isTagsFetching, setIsTagsFetching] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');

  const { userId } = useSelector(state => state.userStore);

  const getTags = async () => {
    setIsTagsFetching(true);
    const tags = await TagsService.getAllTags(userId);
    setIsTagsFetching(false);
    setTagsList(tags);
  };

  useEffect(() => {
    getTags();
  }, []);

  const showModal = tag => {
    setIsModalVisible(true);
    setSelectedTag(tag);
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
        key={tag}
        onPress={() => showModal(tag)}
        style={tw`py-2 px-4 border-[${Color.Neutral.black}] border border-gray-200 rounded-[20px] gap-1 flex-row items-center justify-between`}>
        <Icon type="feather" name="hash" size={18} color={Color.Neutral.black} />
        <Text variant={TextVariant.Body2Regular} color={Color.Neutral.black}>
          {tag}
        </Text>
        <Icon name="trash" type="feather" size={23} color={Color.Warning.JL700} />
      </Pressable>
    ));
  };

  return (
    <BaseScreenLayout testID={testID}>
      <View style={tw`mx-5 flex-1`}>
        <View style={tw`justify-between flex-row items-center mb-3 relative`}>
          <HeaderBackButton />
          <View style={tw`w-full absolute left-0 right-0`}>
            <Text
              variant={TextVariant.Heading3SemiBold}
              color={Color.Neutral.JL900}
              textAlign={TextAlignment.Center}>
              Tags
            </Text>
          </View>
        </View>
        <View style={tw`flex-row justify-between items-center pb-3`}>
          <Text
            variant={TextVariant.Body1SemiBold}
            textTransform="uppercase"
            color={Color.Neutral.JL300}>
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
        <Input
          containerStyle={tw`px-0`}
          inputContainerStyle={tw`border-[${Color.Tertiary.jl100}] border-[1px] rounded-2 py-1 mx-0 px-0`}
          inputStyle={tw`px-2.5 text-[15px] font-Inter mx-0`}
          placeholder="Enter tag name"
          style={tw`text-base`}
          onChangeText={setEnteredTag}
          value={enteredTag}
        />

        <Text
          variant={TextVariant.Body1SemiBold}
          textTransform="uppercase"
          color={Color.Neutral.JL300}>
          Available tags
        </Text>
        <View style={tw`flex-row flex-wrap pt-3 gap-2.2`}>
          {renderPillsList()}
          {!isTagsFetching && tagsList?.length === 0 && renderEmptyList()}
        </View>
      </View>
      <DeleteConfirmationModal
        isModalVisible={isModalVisible}
        tagName={selectedTag}
        userId={userId}
        setTagsList={setTagsList}
        tagsList={tagsList}
        toggleModal={() => setIsModalVisible(false)}
      />
    </BaseScreenLayout>
  );
}
