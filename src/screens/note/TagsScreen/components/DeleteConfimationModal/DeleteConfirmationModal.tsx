import React from 'react';
import { Pressable, View } from 'react-native';
import Modal from 'react-native-modal';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextVariant } from '@jl/constants';
import { TagsService, ToastService } from '@jl/services';

export function DeleteConfirmationModal({ isModalVisible, toggleModal, userId, tagName, tagsList, setTagsList }) {
  const handleTagDeletion = async (tagToDelete: string) => {
    try {
      await TagsService.removeUserTagAndUpdateNotes(userId, tagName);
      const updatedTags = tagsList.filter(tag => tag !== tagName);
      ToastService.success('Success', `${tagToDelete} deleted successfully`);
      setTagsList(updatedTags);
      toggleModal();
    } catch (error) {
      ToastService.error('Error', 'Something went wrong');
      console.log('error', error);
    }
  };

  return (
    <Modal isVisible={isModalVisible} onBackButtonPress={toggleModal}>
      <View style={tw`p-5 bg-[${Color.Neutral.white}] rounded-xl`}>
        <Text variant={TextVariant.Body1SemiBold}>{`Are you sure you want to delete "${tagName}"?`}</Text>
        <View style={tw`mt-4 gap-2 flex-row`}>
          <Pressable style={tw`border-[${Color.Neutral.JL300}] border rounded-md px-3 py-2`} onPress={toggleModal}>
            <Text variant={TextVariant.Label1Regular}>Cancel</Text>
          </Pressable>
          <Pressable
            style={tw`bg-[${Color.Primary.Jl500}] rounded-md px-3 py-2`}
            onPress={() => handleTagDeletion(tagName)}>
            <Text variant={TextVariant.Label1Regular} color={Color.Neutral.white}>
              Yes Delete
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
