import * as React from 'react';

import { renderWithProviders } from '@jl/utils';

import { UnexpectedErrorScreen } from '../UnexpectedErrorScreen';

describe('login screen', () => {
  const testID = 'UnexpectedErrorScreenTestID';
  const getRenderedScreen = () => renderWithProviders(<UnexpectedErrorScreen testID={testID} />);

  it('should render UnexpectedErrorScreen correctly', () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
  it('should find the UnexpectedErrorScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
