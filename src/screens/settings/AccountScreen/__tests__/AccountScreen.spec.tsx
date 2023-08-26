import React from 'react';

import { renderWithProviders } from '@jl/utils';

import { AccountScreen } from '../AccountScreen';

describe('<AccountScreen />', () => {
  const testID = 'AccountScreenTestID';
  const getRenderedScreen = () => renderWithProviders(<AccountScreen testID={testID} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render AccountScreen correctly', () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the AccountScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
