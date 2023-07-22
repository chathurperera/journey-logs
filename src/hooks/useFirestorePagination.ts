import firestore from '@react-native-firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

export const useFirestorePagination = (collectionName, pageSize = 5) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [lastDocument, setLastDocument] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const query = firestore()
        .collection(collectionName)
        .orderBy('createdAt', 'desc')
        .limit(pageSize);

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
    fetchData();
  }, []);

  const fetchMoreData = async () => {
    if (isEndReached || isFetchingMore) return;

    setIsFetchingMore(true);
    try {
      const query = firestore()
        .collection(collectionName)
        .orderBy('createdAt', 'desc')
        .startAfter(lastDocument)
        .limit(pageSize);

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

  const refreshData = useCallback(async () => {
    setIsEndReached(false);
    await fetchData();
  }, [fetchData]);

  return {
    data,
    fetchMoreData,
    isEndReached,
    isFetchingMore,
    isLoading,
    refreshData,
  };
};
