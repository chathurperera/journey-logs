/* eslint-disable @typescript-eslint/no-use-before-define */
import { Input, InputProps } from '@rneui/themed';
import React, { useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { Color, TextVariant } from '@jl/constants';

import { Text } from '../../Text/Text';

export interface TextFieldProps extends InputProps {
  label: string;
  name: string;
  control: Control;
}

export function TextField({ disabled, label, name, control, leftIcon, rightIcon, secureTextEntry }: TextFieldProps) {
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
            containerStyle={styles.containerStyle}
            disabled={disabled}
            errorMessage={error?.message}
            errorStyle={{ display: error?.message ? 'flex' : 'none' }}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            label={labelComponent}
            leftIcon={leftIcon}
            onBlur={onBlur}
            onChangeText={onChange}
            rightIcon={rightIcon}
            rightIconContainerStyle={styles.iconStyles}
            secureTextEntry={secureTextEntry}
            value={value}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 0,
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
  iconStyles: {
    paddingRight: 10,
    marginVertical: 0,
  },
});
