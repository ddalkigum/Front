import React from 'react';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { messageHandler } from '../atom';
import NotFound from '../component/error/NotFound';
import { signinResponse } from '../lib/api/auth';
import { handleAPI } from '../lib/api/common';

const { useEffect } = React;

const Signin = () => {
  const setMessage = useSetRecoilState(messageHandler);
  const navigation = useNavigate();
  const queryString = window.location.search;
  const code = queryString.split('=')[1];

  if (!code) {
    return <NotFound />;
  }

  useEffect(() => {
    handleAPI(signinResponse(code)).then(({ result, status }) => {
      if (status === 'Error') {
        if (result.name === 'BadRequest') {
          setMessage({
            name: 'BadRequest',
            message: '유효하지 않은 인증서입니다\n\r홈으로 돌아갑니다',
            status: 'error',
          });

          setTimeout(() => {
            setMessage(null);
            navigation('/');
          }, 2000);
          return;
        }

        setMessage({
          name: 'BadRequest',
          message: '문제가 발생했습니다',
          status: 'error',
        });

        setTimeout(() => {
          setMessage(null);
          navigation('/');
        }, 2000);
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(result));
      navigation('/');
    });
  }, []);

  return <></>;
};

export default Signin;
