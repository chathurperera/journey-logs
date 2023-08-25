import React from 'react';

import { renderWithProviders } from '@jl/utils';

import { TextToSpeechModal } from '../TextToSpeechModal';

describe('<TextToSpeechModal />', () => {
  const mockSetSpeechText = jest.fn();
  const mockModalVisibilityHandler = jest.fn();
  const testID = 'TextToSpeechModalTestID';

  const getRenderedComponent = () =>
    renderWithProviders(
      <TextToSpeechModal
        testID={testID}
        isModalVisible={true}
        modalVisibilityHandler={mockModalVisibilityHandler}
        setSpeechText={mockSetSpeechText}
      />,
    );
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = getRenderedComponent();
    expect(getByText('Start speaking now!')).toBeTruthy();
  });

  it('calls startRecording when modal becomes visible', () => {
    renderWithProviders(
      <TextToSpeechModal
        testID={testID}
        isModalVisible={true}
        modalVisibilityHandler={mockModalVisibilityHandler}
        setSpeechText={mockSetSpeechText}
      />,
    );
    expect(require('@react-native-voice/voice').start).toBeCalled();
  });

  it('should find the TextToSpeechModal via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
