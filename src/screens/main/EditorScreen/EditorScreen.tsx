import React, { useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';
import { ToastService } from '@jl/services';

import { HeaderBackButton } from '../../../navigation/components/HeaderBackButton';
import { BaseScreenLayout } from '../../components/BaseScreenLayout';

const handleHead = ({ tintColor }) => (
  <Text variant={TextVariant.Body1SemiBold} color={tintColor}>
    H1
  </Text>
);

export function EditorScreen() {
  const RichTextEditorRef = useRef(null);
  const [noteContent, setNoteContent] = useState({
    title: '',
    body: '',
  });

  //NOTE:: RichTextEditorRef.current?.insertText('some text'); can be used to insert data without typing

  const handleDocumentSave = () => {
    const replaceHTML = noteContent.body.replace(/<(.|\n)*?>/g, '').trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, '').trim();

    if (replaceWhiteSpace.length <= 0) {
      ToastService.error('Empty document', 'Document cannot be empty');
    } else {
      //TODO::implement data upload
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
  };

  return (
    <BaseScreenLayout>
      <View style={[tw`mx-5 h-full pb-10`]}>
        <View style={tw`justify-between flex-row items-center`}>
          <HeaderBackButton />
          <Pressable style={tw`bg-[${Color.Primary.Jl600}] py-2 px-2 rounded-3xl w-20`} onPress={handleDocumentSave}>
            <Text variant={TextVariant.Label2SemiBold} color={Color.Neutral.white} textAlign={TextAlignment.Center}>
              Save
            </Text>
          </Pressable>
        </View>
        <View style={tw`pt-5`}>
          <View style={tw`h-full`}>
            <TextInput placeholder="Title" style={tw`text-4xlg pl-2`} onChangeText={handleTitleTextChange} />
            <RichEditor
              ref={RichTextEditorRef}
              disabled={false}
              containerStyle={tw`bg-slate-50`}
              style={tw` flex-1 text-lg`}
              editorStyle={{ backgroundColor: '#F8FAFC', contentCSSText: 'font-size: 20px;' }}
              focusable
              styleWithCSS
              placeholder={'Start typing'}
              onChange={handleTextEditorChange}
            />
            <View style={tw``}>
              <RichToolbar
                editor={RichTextEditorRef}
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
                iconMap={{ [actions.heading1]: handleHead }}
              />
            </View>
          </View>
        </View>
      </View>
    </BaseScreenLayout>
  );
}
