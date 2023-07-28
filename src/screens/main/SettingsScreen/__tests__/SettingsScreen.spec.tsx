import * as React from 'react';

import { renderWithProviders } from '@jl/utils';

import { SettingsScreen } from '../SettingsScreen';

describe('login screen', () => {
  const testID = 'SettingsScreenTestID';
  const getRenderedScreen = () => renderWithProviders(<SettingsScreen testID={testID} />);

  it('should render SettingsScreen correctly', () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
  it('should find the SettingsScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
