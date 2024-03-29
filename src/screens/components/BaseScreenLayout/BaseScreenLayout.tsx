import { useHeaderHeight } from '@react-navigation/elements';
import React, { Ref } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { tw } from '@jl/config';
import { Color } from '@jl/constants';

interface BaseScreenLayoutProps {
  children: React.ReactNode;
  wrapWithScrollView?: boolean;
  testID?: string;
  scrollRef?: Ref<ScrollView>;
}

export function BaseScreenLayout({ children, scrollRef, testID, wrapWithScrollView = true }: BaseScreenLayoutProps) {
  const headerHeight = useHeaderHeight();

  const renderChildren = wrapWithScrollView ? (
    <ScrollView contentContainerStyle={tw`grow`} keyboardShouldPersistTaps="handled" ref={scrollRef} testID={testID}>
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <SafeAreaView style={tw`relative h-full pt-[${headerHeight}px] bg-[${Color.Neutral.white}]`} testID={testID}>
      <KeyboardAvoidingView style={tw`flex-1`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {renderChildren}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
