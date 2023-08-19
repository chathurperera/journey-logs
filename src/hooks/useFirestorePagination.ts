import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';

export const useFirestorePagination = (initialQuery: FirebaseFirestoreTypes.Query, pageSize: number) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [lastDocument, setLastDocument] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    console.log('fetchData fired');
    try {
      let query = initialQuery.limit(pageSize);

      const snapshot = await query.get();
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      setLastDocument(lastVisible || null);

      const newData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsEndReached(false);
    setLastDocument(null);
    setData([]); // Clearing previous data can be helpful
    fetchData();
  }, [initialQuery]);

  const refreshData = useCallback(async () => {
    setIsEndReached(false);
    await fetchData();
  }, [fetchData]);

  useFocusEffect(
    useCallback(() => {
      refreshData();

      return () => {};
    }, [initialQuery]),
  );

  const fetchMoreData = async () => {
    if (isEndReached || isFetchingMore) return;

    setIsFetchingMore(true);
    try {
      let query = initialQuery.startAfter(lastDocument).limit(pageSize);
      const snapshot = await query.get();

      if (snapshot.docs.length === 0) {
        // No more data available.
        setIsEndReached(true);
        return;
      }

      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      setLastDocument(lastVisible || null);

      const newData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      setData(prevData => [...prevData, ...newData]);
    } catch (error) {
      console.error('Error fetching more data:', error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  return {
    data,
    fetchMoreData,
    isEndReached,
    isFetchingMore,
    isLoading,
    refreshData,
  };
};
