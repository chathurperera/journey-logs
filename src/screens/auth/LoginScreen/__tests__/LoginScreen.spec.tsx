import * as React from 'react';

import { renderWithProviders } from '@jl/utils';

import { LoginScreen } from '../LoginScreen';

describe('login screen', () => {
  const testID = 'LoginScreenTestID';
  const getRenderedScreen = () => renderWithProviders(<LoginScreen testID={testID} />);

  it('should render LoginScreen correctly', () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
  it('should find the LoginScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
