import { render } from '@testing-library/react-native';
import * as React from 'react';

import { Button } from '../Button';

describe('Button component', () => {
  const testID = 'ButtonTestID';
  const getRenderedButton = () => render(<Button testID={testID} />);

  describe('should render correctly', () => {
    const rendered = getRenderedButton();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it('should find the button via testID', () => {
    const { getByTestId } = getRenderedButton();
    const foundButton = getByTestId(testID);

    expect(foundButton).toBeTruthy();
  });
});
