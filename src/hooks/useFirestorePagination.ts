import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';

export type Note = {
  id: string;
  [key: string]: any; // Add more specific types as required
};

export const useFirestorePagination = (initialQuery: FirebaseFirestoreTypes.Query, pageSize: number) => {
  const [data, setData] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [isEndReached, setIsEndReached] = useState<boolean>(false);
  const lastDocument = useRef<FirebaseFirestoreTypes.DocumentSnapshot | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const query = initialQuery.limit(pageSize);
      const snapshot = await query.get();
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      lastDocument.current = lastVisible;

      const newData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Note[];
      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [initialQuery, pageSize]);

  useEffect(() => {
    setIsEndReached(false);
    lastDocument.current = null;
    setData([]);
    fetchData();
  }, [fetchData]);

  const refreshData = useCallback(() => {
    setIsEndReached(false);
    fetchData();
  }, [fetchData]);

  useFocusEffect(refreshData);

  const fetchMoreData = useCallback(async () => {
    if (isEndReached || isFetchingMore || !lastDocument.current) return;

    setIsFetchingMore(true);
    try {
      const query = initialQuery.startAfter(lastDocument.current).limit(pageSize);
      const snapshot = await query.get();

      if (snapshot.empty) {
        setIsEndReached(true);
        return;
      }

      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      lastDocument.current = lastVisible;

      const newData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Note[];
      setData(prevData => [...prevData, ...newData]);
    } catch (error) {
      console.error('Error fetching more data:', error);
    } finally {
      setIsFetchingMore(false);
    }
  }, [initialQuery, pageSize, isEndReached, isFetchingMore]);

  return {
    data,
    fetchMoreData,
    isEndReached,
    isFetchingMore,
    isLoading,
    refreshData,
  };
};
