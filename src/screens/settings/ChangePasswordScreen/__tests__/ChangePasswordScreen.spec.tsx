import React from 'react';

import { renderWithProviders } from '@jl/utils';

import { ChangePasswordScreen } from '../ChangePasswordScreen';

describe('<ChangePasswordScreen />', () => {
  const testID = 'ChangePasswordScreenTestID';
  const getRenderedScreen = () => renderWithProviders(<ChangePasswordScreen testID={testID} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render ChangePasswordScreen correctly', () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ChangePasswordScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
