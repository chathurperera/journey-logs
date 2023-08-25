import React from 'react';

import { renderWithProviders } from '@jl/utils';

import { TagsList } from '../TagsList';

jest.mock('@jl/hooks', () => ({
  useFetch: jest.fn(),
}));

jest.mock('@jl/stores', () => ({
  useSelector: jest.fn(),
}));

describe('Describe <TagsList />', () => {
  const mockSetSelectedTags = jest.fn();
  const testID = 'TagsListTestID';

  const getRenderedComponent = () =>
    renderWithProviders(<TagsList selectedTags={['All']} setSelectedTags={mockSetSelectedTags} testID={testID} />);

  beforeEach(() => {
    jest.resetAllMocks();

    require('@jl/hooks').useFetch.mockReturnValue({
      data: ['tag1', 'tag2'],
    });

    require('@jl/stores').useSelector.mockReturnValue({
      userStore: {
        userData: {
          userId: '12345',
        },
      },
    });
  });

  it('should find the LoginScreen via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });

  it('should render TagsList correctly', () => {
    const renderer = getRenderedComponent();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('renders tags when isEditable is false', () => {
    const { getByText } = renderWithProviders(
      <TagsList selectedTags={['All']} setSelectedTags={mockSetSelectedTags} isEditable={false} />,
    );

    expect(getByText('All')).toBeTruthy();
    // The component should not render 'tag1' and 'tag2' when isEditable is false
    expect(() => getByText('tag1')).toThrow();
    expect(() => getByText('tag2')).toThrow();
  });
});
