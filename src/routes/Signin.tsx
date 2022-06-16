import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import {
  checkCertificationCodeResponse,
  signinResponse,
} from '../lib/api/auth';

const { useEffect } = React;

const Signin = () => {
  const navigation = useNavigate();
  const queryString = window.location.search;
  const code = queryString.split('=')[1];
  useEffect(() => {
    signinResponse(code)
      .then(({ result }) => {
        const { id, email, nickname, profileImage } = result;
        console.log(result);
        localStorage.setItem(
          'currentUser',
          JSON.stringify({ id, email, nickname, profileImage })
        );
        navigation('/');
      })
      .catch((error) => console.log(error));
  }, []);

  return <></>;
};

export default Signin;
