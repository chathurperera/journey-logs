import { NavigationContext } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React, { ReactNode } from 'react';

type RenderParams = Parameters<typeof render>;

export function renderWithProviders(ui: RenderParams[0], options?: RenderParams[1]) {
  const BaseProviders = ({ children }: { children: ReactNode }) => (
    <NavigationContext.Provider
      //@ts-ignore
      value={{
        isFocused: () => true,
        addListener: jest.fn(() => jest.fn()),
      }}>
      {children}
    </NavigationContext.Provider>
  );

  return render(ui, { wrapper: BaseProviders, ...options });
}
