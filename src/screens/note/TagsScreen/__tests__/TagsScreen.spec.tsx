import { cleanup, render, waitFor } from '@testing-library/react-native';
import React from 'react';

import { TagsService } from '@jl/services';

import { TagsScreen } from '../TagsScreen';

jest.mock('@jl/services', () => ({
  TagsService: {
    getAllTags: jest.fn(),
    createTag: jest.fn(),
  },
}));

describe('<TagsScreen />', () => {
  const testID = 'TagsScreenTestID';

  afterEach(cleanup);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<TagsScreen testID={testID} />);
    expect(getByTestId(testID)).toBeTruthy();
  });

  it('should find the TagsScreen via testID', () => {
    const { getByTestId } = render(<TagsScreen testID={testID} />);
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });

  it('fetches tags on component mount', async () => {
    const mockTags = ['tag1', 'tag2'];
    (TagsService.getAllTags as jest.Mock).mockResolvedValue(mockTags);

    const { unmount } = render(<TagsScreen testID="tagsScreen" />); // Note this change

    await waitFor(() => expect(TagsService.getAllTags).toBeCalled());

    unmount();
  });
});
