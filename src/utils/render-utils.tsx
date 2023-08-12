import { NavigationContext } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '@jl/stores';

type RenderParams = Parameters<typeof render>;

export function renderWithProviders(ui: RenderParams[0], options?: RenderParams[1]) {
  const BaseProviders = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <NavigationContext.Provider
        //@ts-ignore
        value={{
          isFocused: () => true,
          addListener: jest.fn(() => jest.fn()),
        }}>
        {children}
      </NavigationContext.Provider>
    </Provider>
  );

  return render(ui, { wrapper: BaseProviders, ...options });
}
