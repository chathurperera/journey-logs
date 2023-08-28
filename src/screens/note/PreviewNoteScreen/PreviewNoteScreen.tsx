import { Icon } from '@rneui/base';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { Portal } from 'react-native-portalize';

import { LoadingSpinner, TagsList, Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextVariant } from '@jl/constants';
import { useFetch } from '@jl/hooks';
import { HeaderBackButton } from '@jl/navigation';
import { NoteEncryption, NoteService, ToastService } from '@jl/services';
import { useSelector } from '@jl/stores';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { MenuBottomSheet } from './components/MenuBottomSheet';
import { PINCheckModal } from './components/PINCheckModal';

const handleHead = ({ tintColor }) => (
  <Text variant={TextVariant.Body1SemiBold} color={tintColor}>
    H1
  </Text>
);

export function PreviewNoteScreen({ route }) {
  const { noteId } = route.params.params;
  const [decryptedNote, setDecryptedNote] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditorDisabled, setIsEditorDisabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const RichTextEditorRef = useRef(null);

  const { userId } = useSelector(state => state.userStore);
  const [noteContent, setNoteContent] = useState({
    userId: userId,
    title: '',
    body: '',
  });

  const { recoveryKey } = useSelector(state => state.encryptionStore);
  const { data: noteData, isLoading } = useFetch(() => NoteService.getSingleNote(noteId));

  useEffect(() => {
    if (noteData?.isEncrypted) {
      const getEncryptedNote = async () => {
        const note = await NoteEncryption.getDecryptedNote(noteData?.body, recoveryKey);
        setDecryptedNote(note);
      };

      getEncryptedNote();
    }
  }, [isLoading]);

  useEffect(() => {
    if (noteData) {
      setNoteContent(prevValues => {
        return { ...prevValues, title: noteData?.title, body: noteData?.body };
      });
      setSelectedTags(noteData?.tags);
    }
  }, [isLoading]);

  const MenuBottomSheetMethodsRef = useRef<Modalize>(null);

  const handleMenuBottomSheet = () => {
    MenuBottomSheetMethodsRef.current?.open();
  };

  const handleDocumentUpdate = async () => {
    const replaceWhiteSpace = noteContent.body.replace(/&nbsp;/g, '').trim();

    if (replaceWhiteSpace.length <= 0) {
      ToastService.error('Empty document', 'Document cannot be empty');
    } else {
      setIsSaving(true);

      if (noteContent.title === '') {
        setNoteContent({ ...noteContent, title: 'Untitled note' });
      }

      await NoteService.updateNote(noteId, {
        title: noteContent.title,
        body: replaceWhiteSpace,
        userId: noteContent.userId,
        tags: selectedTags,
      });

      setIsSaving(false);
      setIsEditing(false);
      setIsEditorDisabled(true);
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
    const initialBodyText = noteData?.isEncrypted ? decryptedNote : noteData?.body;
    RichTextEditorRef.current?.insertHTML(initialBodyText);
    setIsEditorDisabled(true);
  };

  const toggleEditingMode = () => {
    setIsEditing(true);
    setIsEditorDisabled(false);
    RichTextEditorRef.current?.focusContentEditor();
  };

  const renderContent = () => (
    <>
      <TagsList
        setSelectedTags={setSelectedTags}
        selectedTags={selectedTags}
        isEditable={isEditing}
      />
      <View style={tw`mb-3 h-full pb-22`}>
        <TextInput
          placeholder="Title"
          style={tw`text-4xlg pl-2`}
          value={noteContent.title}
          onChangeText={handleTitleTextChange}
          editable={isEditing}
        />
        <RichEditor
          ref={RichTextEditorRef}
          editorInitializedCallback={handleEditorInitialization}
          disabled={isEditorDisabled}
          containerStyle={tw`bg-[${Color.Neutral.white}]`}
          style={tw`flex-1 text-lg bg-[${Color.Neutral.white}]`}
          editorStyle={{ backgroundColor: '#fff', contentCSSText: 'font-size: 20px;' }}
          focusable
          styleWithCSS
          placeholder={'Start typing'}
          onChange={handleTextEditorChange}
        />
        {isEditing && (
          <RichToolbar
            editor={RichTextEditorRef}
            getEditor={() => RichTextEditorRef}
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
        )}
      </View>
    </>
  );

  const renderHeader = () => (
    <View style={tw`justify-between flex-row items-center mb-3`}>
      <HeaderBackButton />
      {isEditing ? (
        <Pressable
          style={tw`gap-2 px-7 py-2.5 rounded-3xl flex-row bg-[${Color.Primary.Jl500}]`}
          onPress={handleDocumentUpdate}>
          {isSaving && <LoadingSpinner size="small" color={Color.Neutral.white} />}
          <Text variant={TextVariant.Label2SemiBold} color={Color.Neutral.white}>
            Save
          </Text>
        </Pressable>
      ) : (
        <View style={tw`justify-between flex-row gap-3 items-center relative`}>
          <View style={tw`justify-center p-1 rounded-md bg-[${Color.Secondary.JL50}]`}>
            <Icon
              type="feather"
              name="more-vertical"
              size={25}
              onPress={!isLoading && handleMenuBottomSheet}
              color={Color.Primary.Jl500}
            />
          </View>
        </View>
      )}
    </View>
  );

  return (
    <BaseScreenLayout>
      <View style={[tw`mx-5 h-full pb-10`]}>
        {renderHeader()}
        {isLoading ? <LoadingSpinner size="large" color={Color.Primary.Jl500} /> : renderContent()}
      </View>
      <PINCheckModal
        isModalVisible={isModalVisible}
        toggleModal={() => setModalVisible(state => !state)}
        noteId={noteId}
        note={noteData?.body}
      />
      <Portal>
        <MenuBottomSheet
          ref={MenuBottomSheetMethodsRef}
          noteId={noteId}
          title={noteData?.title}
          openPINCheckModal={() => setModalVisible(true)}
          body={noteData?.body}
          toggleEditingMode={toggleEditingMode}
          isEncrypted={noteData?.isEncrypted}
          isFavourite={noteData?.isFavourite}
        />
      </Portal>
    </BaseScreenLayout>
  );
}
