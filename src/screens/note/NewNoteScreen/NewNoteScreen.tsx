import { Icon } from '@rneui/base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';

import { LoadingSpinner, TagsList, Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextAlignment, TextVariant } from '@jl/constants';
import { HeaderBackButton } from '@jl/navigation';
import { NavigationService, NoteService, ToastService } from '@jl/services';
import { useSelector } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { TextToSpeechModal } from './components/TextToSpeechModal';

const handleHead = ({ tintColor }) => (
  <Text variant={TextVariant.Body1SemiBold} color={tintColor}>
    H1
  </Text>
);

interface NewNoteScreenProps {
  testID: string;
}

export function NewNoteScreen({ testID }: NewNoteScreenProps) {
  const RichTextEditorRef = useRef(null);

  const { userId } = useSelector(state => state.userStore);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [noteContent, setNoteContent] = useState({
    userId: '',
    title: '',
    body: '',
  });
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const [speechText, setSpeechText] = useState('');

  const handleDocumentSave = async () => {
    const replaceWhiteSpace = noteContent.body.replace(/&nbsp;/g, '').trim();

    if (replaceWhiteSpace.length <= 0) {
      ToastService.error('Empty document', 'Document cannot be empty');
    } else {
      setIsLoading(true);

      if (noteContent.title === '') {
        setNoteContent({ ...noteContent, title: 'Untitled note' });
      }

      await NoteService.createNote({
        title: noteContent.title,
        userId: userId,
        body: replaceWhiteSpace,
        tags: selectedTags,
      });
      setIsLoading(false);
      NavigationService.navigate(Route.HomeTab);
    }
  };

  const handleTitleTextChange = text => {
    setNoteContent(prevValues => {
      return { ...prevValues, title: text };
    });
  };

  const handleTextEditorChange = text => {
    setNoteContent(prevValues => {
      return { ...prevValues, body: text };
    });

    if (noteContent.body.length > 1000) {
      setIsLimitExceeded(true);
    } else {
      setIsLimitExceeded(false);
    }
  };

  const renderCharacterExceededMessage = () => (
    <View>
      <Text
        variant={TextVariant.Label2Regular}
        color={Color.Warning.JL800}
        textAlign={TextAlignment.Center}>
        Note length exceeded!
      </Text>
      <Text
        variant={TextVariant.Label2Regular}
        color={Color.Warning.JL800}
        textAlign={TextAlignment.Center}>
        Please keep your note under 1000 characters
      </Text>
    </View>
  );

  const handleVoiceTextChange = useCallback(() => {
    if (RichTextEditorRef.current && speechText) {
      RichTextEditorRef.current.insertText(` ${speechText}`);
    }
  }, [speechText]);

  useEffect(() => {
    handleVoiceTextChange();
  }, [speechText]);

  return (
    <BaseScreenLayout testID={testID}>
      <View style={[tw`mx-5 h-full pb-10`]}>
        <View style={tw`justify-between flex-row items-center`}>
          <HeaderBackButton />
          {/* TODO:: replace with a proper button variant */}
          <View style={tw`justify-between flex-row gap-2 items-center relative`}>
            <Pressable
              disabled={isLimitExceeded}
              style={tw`bg-[${
                isLimitExceeded ? Color.Primary.Jl200 : Color.Primary.Jl500
              }] py-2 px-6 rounded-3xl  gap-2 flex-row justify-between items-center`}
              onPress={handleDocumentSave}>
              {isLoading && <LoadingSpinner size="small" />}
              <Text
                variant={TextVariant.Label2SemiBold}
                color={Color.Neutral.white}
                textAlign={TextAlignment.Center}>
                Save
              </Text>
            </Pressable>
          </View>
        </View>
        {isLimitExceeded && renderCharacterExceededMessage()}

        <View style={tw`h-full pt-4 relative`}>
          <TagsList
            setSelectedTags={setSelectedTags}
            selectedTags={selectedTags}
            isEditable={true}
          />
          <TextInput
            placeholder="Title"
            style={tw`text-4xlg pl-2`}
            onChangeText={handleTitleTextChange}
          />
          <RichEditor
            ref={RichTextEditorRef}
            disabled={false}
            containerStyle={tw`bg-[${Color.Neutral.white}]`}
            style={tw`flex-1 text-lg bg-[${Color.Neutral.white}]`}
            editorStyle={{ backgroundColor: '#fff', contentCSSText: 'font-size: 20px;' }}
            focusable
            styleWithCSS
            placeholder={'Start typing'}
            onChange={handleTextEditorChange}
          />
          <View style={tw`absolute bottom-0 right-0 left-0`}>
            <RichToolbar
              editor={RichTextEditorRef}
              style={tw`bg-[${Color.Neutral.black}] h-12.5 rounded-xl`}
              unselectedButtonStyle={tw``}
              iconSize={23}
              iconTint={Color.Neutral.JL300}
              selectedIconTint={Color.Neutral.white}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.heading1,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.keyboard,
                actions.undo,
                actions.redo,
              ]}
              // style={tw``}
              iconMap={{ [actions.heading1]: handleHead }}
            />
          </View>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={tw`w-15 h-15 rounded-full bg-[${Color.Primary.Jl500}] justify-center absolute bottom-20 right-0`}>
            <Icon type="feather" name="mic" color={Color.Neutral.white} size={22} />
          </Pressable>
        </View>
      </View>
      {isModalVisible && (
        <TextToSpeechModal
          setSpeechText={setSpeechText}
          isModalVisible={isModalVisible}
          modalVisibilityHandler={() => setModalVisible(false)}
        />
      )}
    </BaseScreenLayout>
  );
}
