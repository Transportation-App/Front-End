import { useState, useEffect, useCallback } from "react";

type UseConditionalFetchReturn<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
};

const useConditionalFetch = <T,>(
  url: string,
  shouldFetch: boolean = false
): UseConditionalFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [shouldFetch, fetchData]);

  return { data, loading, error, fetchData };
};

export default useConditionalFetch;
