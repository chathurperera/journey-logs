import * as React from 'react';

import { renderWithProviders } from '@jl/utils';

import { NewNoteScreen } from '../NewNoteScreen';

describe('Tags screen', () => {
  const testID = 'NewNoteScreenTestID';
  const getRenderedScreen = () => renderWithProviders(<NewNoteScreen testID={testID} />);

  it('should render NewNoteScreen correctly', () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the NewNoteScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
