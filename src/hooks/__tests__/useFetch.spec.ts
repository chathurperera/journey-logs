import { renderHook } from '@testing-library/react-hooks';

import { useFetch } from '../useFetch';

describe('useFetch', () => {
  it('should start with a loading state', () => {
    const fetchMethod = jest.fn().mockResolvedValue('data');
    const { result } = renderHook(() => useFetch(fetchMethod));

    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isSuccess).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
  });

  it('should handle successful fetch', async () => {
    const mockData = 'data';
    const fetchMethod = jest.fn().mockResolvedValue(mockData);
    const { result, waitForNextUpdate } = renderHook(() => useFetch(fetchMethod));

    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.data).toBe(mockData);
  });

  it('should handle errors', async () => {
    const fetchMethod = jest.fn().mockRejectedValue(new Error('An error occurred'));
    const { result, waitForNextUpdate } = renderHook(() => useFetch(fetchMethod));

    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isSuccess).toBeFalsy();
    expect(result.current.isError).toBeTruthy();
    expect(result.current.data).toBeUndefined();
  });
});
