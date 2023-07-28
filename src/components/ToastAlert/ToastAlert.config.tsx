import React from 'react';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#3FAD46', borderLeftWidth: 6 }}
      text1Style={{
        fontFamily: 'Inter',
        color: '#3FAD46',
        fontSize: 18,
        fontWeight: '500',
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#CC6D00', borderLeftWidth: 6 }}
      text1Style={{
        fontFamily: 'Inter',
        color: '#CC6D00',
        fontSize: 18,
        fontWeight: '500',
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
};
