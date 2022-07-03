import React from 'react';
import { useSetRecoilState } from 'recoil';
import { messageHandler } from '../../atom';

const useSetMessage = (
  name: string,
  message: string,
  status: 'error' | 'success'
) => {
  const setMessage = useSetRecoilState(messageHandler);

  setMessage({ name, message, status });

  setTimeout(() => {
    setMessage(null);
  }, 1500);
};

export default useSetMessage;
