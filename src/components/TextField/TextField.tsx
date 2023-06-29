/* eslint-disable @typescript-eslint/no-use-before-define */
import { Input, InputProps } from '@rneui/themed';
import React, { useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { Color, TextVariant } from '@jl/constants';

import { Text } from '../Text/Text';

interface TextFieldProps extends InputProps {
  label: string;
  name: string;
  control: Control;
}

export function TextField({ disabled, label, name, secureTextEntry, control }: TextFieldProps) {
  const labelComponent = useMemo(
    () => (
      <>
        <View className="pb-1">
          <Text variant={TextVariant.Label1Regular} color={Color.Neutral.black}>
            {label}
          </Text>
        </View>
      </>
    ),
    [label],
  );

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <Input
            disabled={disabled}
            value={value}
            label={labelComponent}
            onChangeText={onChange}
            onBlur={onBlur}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            errorMessage={error?.message}
            secureTextEntry={secureTextEntry}
            errorStyle={{ display: error?.message ? 'flex' : 'none' }}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 0,
    marginBottom: 14,
  },
  inputContainerStyle: {
    borderColor: Color.Secondary.jl100,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 2,
  },
  inputStyle: {
    paddingHorizontal: 10,
    fontSize: 15,
    fontFamily: 'Inter',
  },
  errorStyle: {
    display: 'none',
  },
});
