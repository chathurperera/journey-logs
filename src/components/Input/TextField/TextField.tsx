/* eslint-disable @typescript-eslint/no-use-before-define */
import { Input, InputProps } from '@rneui/themed';
import React, { useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { View } from 'react-native';

import { tw } from '@jl/config';
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
        <View style={tw`pb-1`}>
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
            containerStyle={tw`px-0`}
            disabled={disabled}
            errorMessage={error?.message}
            errorStyle={{ display: error?.message ? 'flex' : 'none' }}
            inputContainerStyle={tw`border-[${Color.Secondary.jl100}] border-[1px] rounded-2 py-1`}
            inputStyle={tw`px-2.5 text-[15px] font-Inter`}
            label={labelComponent}
            leftIcon={leftIcon}
            onBlur={onBlur}
            onChangeText={onChange}
            rightIcon={rightIcon}
            rightIconContainerStyle={tw`pr-2.5 my-0`}
            secureTextEntry={secureTextEntry}
            value={value}
          />
        )}
      />
    </>
  );
}
