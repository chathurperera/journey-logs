import { Input, InputProps } from '@rneui/themed';
import React from 'react';

export function TextField({ disabled, value }: InputProps) {
  return <Input disabled={disabled} value={value} />;
}
