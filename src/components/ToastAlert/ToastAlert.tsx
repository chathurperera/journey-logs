import React from 'react';
import Toast from 'react-native-toast-message';

import { toastConfig } from './ToastAlert.config';

export function ToastAlert() {
  return <Toast config={toastConfig} />;
}
