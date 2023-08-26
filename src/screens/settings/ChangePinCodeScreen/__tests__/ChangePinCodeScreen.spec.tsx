import React from 'react';

import { renderWithProviders } from '@jl/utils';

import { ChangePinCodeScreen } from '../ChangePinCodeScreen';

describe('<ChangePinCodeScreen />', () => {
  const testID = 'ChangePinCodeScreenTestID';
  const getRenderedScreen = () => renderWithProviders(<ChangePinCodeScreen testID={testID} />);

  it('should render ChangePINCodeScreen correctly', () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ChangePINCodeScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
