import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface BaseScreenLayoutProps {
  children: React.ReactNode;
}

export function BaseScreenLayout({ children }: BaseScreenLayoutProps) {
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView className={`relative h-full pt-[${headerHeight}px]`}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{children}</ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
