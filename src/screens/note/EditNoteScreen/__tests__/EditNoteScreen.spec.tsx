import { render } from '@testing-library/react-native';
import * as React from 'react';

import { EditNoteScreen } from '../EditNoteScreen';

describe('EditNoteScreen Screen', () => {
  const testID = 'EditNoteScreenTestID';

  const mockRoute = {
    params: {
      params: {
        noteId: 'dqiowj0240nuA01R31',
      },
    },
  };

  const getRenderedScreen = () => render(<EditNoteScreen route={mockRoute} testID={testID} />);

  it('should render EditNoteScreen correctly', () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ChangePasswordScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
