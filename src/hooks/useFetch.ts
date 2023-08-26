import { useCallback, useEffect, useRef, useState } from 'react';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export const useFetch = <T>(fetchMethod: () => Promise<T>): FetchState<T> => {
  const isMounted = useRef(true);

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prevState => ({
        ...prevState,
        isLoading: true,
        isSuccess: false,
        isError: false,
      }));

      const data = await fetchMethod();

      setState({
        data,
        isLoading: false,
        isSuccess: true,
        isError: false,
      });
    } catch (error) {
      setState({
        data: undefined,
        isLoading: false,
        isSuccess: false,
        isError: true,
      });
    }
  }, [fetchMethod]);

  useEffect(() => {
    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { ...state };
};
