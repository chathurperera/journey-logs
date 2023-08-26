import { act, cleanup, waitFor } from '@testing-library/react-native';
import { createRef } from 'react';
import { Modalize } from 'react-native-modalize';

import { renderWithProviders } from '@jl/utils';

import { MenuBottomSheet } from '../MenuBottomSheet';

describe('<MenuBottomSheet />', () => {
  const testID = 'MenuBottomSheetTestID';

  const mockProps = {
    testID: testID,
    noteId: 'sampleId',
    body: 'sampleBody',
    title: 'sampleTitle',
    isEncrypted: false,
    isFavourite: false,
    toggleEditingMode: jest.fn(),
  };

  const ref = createRef<Modalize>();
  const getRenderedComponent = () => renderWithProviders(<MenuBottomSheet {...mockProps} ref={ref} />);

  afterEach(cleanup);
  it('should render MenuBottomSheet correctly', () => {
    const renderer = getRenderedComponent();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the MenuBottomSheet via testID', async () => {
    const { getByTestId } = getRenderedComponent();
    expect(() => getByTestId(testID)).toThrow('Unable to find an element with testID: MenuBottomSheetTestID');

    act(() => {
      ref.current?.open();
    });

    await waitFor(() => {
      expect(() => getByTestId(testID)).toBeDefined();
    });
  });
});
