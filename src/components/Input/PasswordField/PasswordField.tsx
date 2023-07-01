import { Icon } from '@rneui/themed';
import React, { useState } from 'react';

import { TextField, TextFieldProps } from '../TextField';

export function PasswordField({ ...props }: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(true);

  const handelIconPress = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <TextField
      secureTextEntry={showPassword}
      rightIcon={
        showPassword ? (
          <Icon type="feather" name="eye-off" onPress={handelIconPress} />
        ) : (
          <Icon type="feather" name="eye" onPress={handelIconPress} />
        )
      }
      {...props}
    />
  );
}
