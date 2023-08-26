import Voice from '@react-native-voice/voice';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Modal from 'react-native-modal';

import { lottie } from '@jl/assets';
import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';

interface TextToSpeechModalProps {
  isModalVisible: boolean;
  modalVisibilityHandler: () => void;
  setSpeechText: (text: string) => void;
  testID?: string;
}

export function TextToSpeechModal({
  isModalVisible,
  modalVisibilityHandler,
  setSpeechText,
  testID,
}: TextToSpeechModalProps) {
  const animationRef = useRef<LottieView | null>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');

  const speechStartHandler = (): void => {
    console.log('speech started');
  };

  const speechEndHandler = (): void => {
    setIsRecording(false);
    animationRef.current?.pause();
    setSpeechText(result);
    setResult('');
    modalVisibilityHandler();
  };

  const speechErrorHandler = (e: any): void => {
    console.log('speech error', e);
  };

  const speechResultsHandler = (e: { value: string[] }): void => {
    const text = e.value[0];
    setResult(text);
  };

  const handleVoiceInstanceDestroy = async (): Promise<void> => {
    await Voice.destroy().then(Voice.removeAllListeners);
  };

  const startRecording = async (): Promise<void> => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOnBackdropPress = async (): Promise<void> => {
    try {
      await Voice.stop();
      setIsRecording(false);
      animationRef.current?.pause();
      setSpeechText(result);
      setResult('');
      handleVoiceInstanceDestroy();
      modalVisibilityHandler();
    } catch (error) {
      console.log('error', error);
    }
  };

  const speechRecognizedHandler = (): void => {
    animationRef.current?.play();
    setIsRecording(true);
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;
    Voice.onSpeechRecognized = speechRecognizedHandler;

    return () => {
      console.log('instance destroyed');
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (Voice) {
      startRecording();
    }
  }, [isModalVisible]);

  return (
    <Modal isVisible={isModalVisible} onBackdropPress={handleOnBackdropPress} testID={testID}>
      <View style={tw`py-4 px-3.6 bg-[${Color.Neutral.white}] rounded-lg `}>
        <Pressable onPress={startRecording}>
          <LottieView source={lottie.voiceRecordAnimation} ref={animationRef} style={tw`w-20 h-20 mx-auto`} />
        </Pressable>
        <View style={tw``}>
          {isRecording ? (
            <ScrollView
              style={tw`h-10`}
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
              <Text variant={TextVariant.Heading3Regular} color={Color.Neutral.JL700}>
                {result}
              </Text>
            </ScrollView>
          ) : (
            <Text variant={TextVariant.Body2SemiBold} color={Color.Neutral.JL400} textAlign={TextAlignment.Center}>
              Start speaking now!
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
}
