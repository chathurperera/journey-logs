import auth from '@react-native-firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';

import { LoadingSpinner, Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextAlignment, TextVariant } from '@jl/constants';
import { useFetch } from '@jl/hooks';
import { HeaderBackButton } from '@jl/navigation';
import { NavigationService, NoteService, ToastService } from '@jl/services';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

const handleHead = ({ tintColor }) => (
  <Text variant={TextVariant.Body1SemiBold} color={tintColor}>
    H1
  </Text>
);
const userId = auth().currentUser?.uid;

export function EditNoteScreen({ route, testID }) {
  const RichTextEditorRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [noteContent, setNoteContent] = useState({
    userId: userId,
    title: '',
    body: '',
  });

  const { noteId } = route.params.params;
  const { data: noteData } = useFetch(() => NoteService.getSingleNote(noteId));

  useEffect(() => {
    setNoteContent(prevState => ({ ...prevState, title: noteData?.title }));
  }, [noteData]);

  const handleDocumentUpdate = async () => {
    const contentWithoutHTML = noteContent.body.replace(/<(.|\n)*?>/g, '').trim();
    const replaceWhiteSpace = contentWithoutHTML.replace(/&nbsp;/g, '').trim();

    if (replaceWhiteSpace.length <= 0) {
      ToastService.error('Empty document', 'Document cannot be empty');
    } else {
      setIsSaving(true);

      if (noteContent.title === '') {
        setNoteContent({ ...noteContent, title: 'Untitled note' });
      }

      await NoteService.updateNote(noteId, {
        title: noteContent.title,
        body: contentWithoutHTML,
        userId: noteContent.userId,
      });

      setIsSaving(false);
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
  };

  const handleEditorInitialization = () => {
    RichTextEditorRef.current?.focusContentEditor();
    RichTextEditorRef.current?.insertText(noteData?.body);
  };

  return (
    <BaseScreenLayout>
      <View style={[tw`mx-5 h-full pb-10`]} testID={testID}>
        <View style={tw`justify-between flex-row items-center`}>
          <HeaderBackButton />
          {/* TODO:: replace with a proper button variant */}
          <View style={tw`justify-between flex-row gap-2 items-center relative`}>
            <Pressable
              style={tw`bg-[${Color.Primary.Jl600}] py-2 px-6 rounded-3xl  gap-2 flex-row justify-between items-center`}
              onPress={handleDocumentUpdate}>
              {isSaving && <LoadingSpinner size="small" />}
              <Text
                variant={TextVariant.Label2SemiBold}
                color={Color.Neutral.white}
                textAlign={TextAlignment.Center}>
                Update
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={tw`pt-5`}>
          <View style={tw`h-full`}>
            <TextInput
              placeholder="Title"
              style={tw`text-4xlg pl-2`}
              value={noteContent.title}
              onChangeText={handleTitleTextChange}
            />
            <RichEditor
              ref={RichTextEditorRef}
              editorInitializedCallback={handleEditorInitialization}
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
