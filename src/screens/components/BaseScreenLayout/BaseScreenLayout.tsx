import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { tw } from '@jl/config';

interface BaseScreenLayoutProps {
  children: React.ReactNode;
}

export function BaseScreenLayout({ children }: BaseScreenLayoutProps) {
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView style={tw`relative h-full pt-[${headerHeight}px]`}>
      <KeyboardAvoidingView style={tw`flex-1`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={tw`grow`} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
