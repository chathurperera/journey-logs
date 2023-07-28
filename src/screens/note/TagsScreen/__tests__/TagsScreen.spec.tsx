import * as React from 'react';

import { renderWithProviders } from '@jl/utils';

import { DummyTags } from '../DummyTags';
import { TagsScreen } from '../TagsScreen';

describe('Tags screen', () => {
  const testID = 'TagsScreenTestID';
  const getRenderedScreen = () => renderWithProviders(<TagsScreen testID={testID} />);

  it('should render TagsScreen correctly', () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
  it('renders the correct text for the number of tags', () => {
    const { findByText } = getRenderedScreen();
    const tagCountText = findByText(`${DummyTags.length} Tags`);
    expect(tagCountText).toBeTruthy();
  });

  it('should find the TagsScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
