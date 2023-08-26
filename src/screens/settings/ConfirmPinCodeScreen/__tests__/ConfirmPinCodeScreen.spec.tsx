import React from 'react';

import { renderWithProviders } from '@jl/utils';

import { ConfirmPinCodeScreen } from '../ConfirmPinCodeScreen';

describe('<ConfirmPinCodeScreen />', () => {
  const testID = 'ConfirmPinCodeScreenTestID';

  const mockRouteParams = { params: { params: { pinCode: '1111' } } };
  const getRenderedScreen = () =>
    renderWithProviders(<ConfirmPinCodeScreen testID={testID} route={mockRouteParams} />);

  it('should render ConfirmPinCodeScreen correctly', () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ConfirmPinCodeScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
