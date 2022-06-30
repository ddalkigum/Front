import React from 'react';
import { AxiosPromise, AxiosInstance } from 'axios';
import { BaseResponse } from '../api/interface';

const { useCallback, useState } = React;

function useRequest<T>(axiosPromise: any) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BaseResponse<T>>();
  const [error, setError] = useState();

  const onRequest = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosPromise();
      setData(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      }
      if (error.request) {
        setError(error.request);
      }
    }
    setLoading(false);
  }, []);

  return [onRequest, data, loading, error];
}

export default useRequest;
