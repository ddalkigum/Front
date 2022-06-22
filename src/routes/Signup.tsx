import { AxiosError } from 'axios';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import Header from '../component/base/Header';
import RoundButton from '../component/common/RoundButton';
import MainTemplate from '../component/main/MainTemplate';
import {
  checkCertificationCodeResponse,
  signupResponse,
} from '../lib/api/auth';
import { mediaQuery } from '../lib/style/media';
import { theme } from '../style/theme';

const { useState, useEffect } = React;

const Block = styled.div`
  width: 500px;
  height: 100%;
  margin: auto;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${mediaQuery(776)} {
    margin-left: 1.5rem;
  }
`;

const WelcomWord = styled.span`
  font-size: 2.5rem;
`;

const SubTitle = styled.div`
  padding: 2rem 0 1rem 0;
`;

const EmailArea = styled.div`
  span {
    font-size: 1rem;
  }
`;

const NicknameInputArea = styled.div`
  display: flex;
  justify-content: space-between;

  input {
    width: 60%;
    outline: none;
    padding: 0.5rem 0;
    background-color: ${theme.homeBackground};
    border-bottom: 2px solid ${theme.boldLine};
    font-size: 1rem;

    :focus {
      border-bottom: 2px solid ${theme.azureRadiance};
    }
  }
`;

const CheckSignupArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;

  button {
    margin: 1rem 0;
  }

  span {
    color: ${theme.persianPink};
  }
`;

const validateNickname = (nickname: string) => {
  if (nickname === '') {
    return '닉네임을 입력해주세요.';
  }

  if (nickname.length > 10) {
    return '닉네임은 10자까지 가능해요.';
  }

  const regex = /^[a-z가-힣0-9-_]{3,20}$/;
  if (!regex.test(nickname)) {
    return '닉네임은 3~10자 알파벳, 한글, 숫자, -, _ 로 만들어주세요.';
  }
};

const Signup = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const queryString = location.search;
  const [_, code] = queryString.split('=');

  const nicknameInput = React.createRef<HTMLInputElement>();
  const [isDuplicate, setDuplicate] = useState(false);
  const [message, setMessage] = useState('');
  const [safeEmail, setSafeEmail] = useState('');
  const [isLoading, setPage] = useState(false);

  useEffect(() => {
    const getEmailRequest = async (code: string) => {
      const response = await checkCertificationCodeResponse(code);
      const { email, isSignup } = response.result;

      if (response.result.message === 'DoesNotExistCertification') {
        navigation('/');
      }
      setSafeEmail(email);
    };

    if (!isLoading) {
      getEmailRequest(code).then(() => {
        setPage(!isLoading);
      });
    }
  }, ['']);

  const signupRequest = async (event) => {
    event.preventDefault();
    setMessage('');
    const nickname = nicknameInput.current.value;
    const result = validateNickname(nickname);

    if (result) {
      setMessage(result);
      setDuplicate(true);
      return;
    }

    setDuplicate(false);

    try {
      const response = await signupResponse(code, safeEmail, nickname);
      const cleanUser = {
        id: response.result.id,
        nickname: response.result.nickname,
        profileImage: response.result.profileImage,
      };

      localStorage.setItem('currentUser', JSON.stringify(cleanUser));
      navigation('/');
    } catch (error) {
      if (error.response.data.result.message === 'AlreadyExistNickname') {
        setMessage('중복된 닉네임입니다');
        setTimeout(() => setMessage(''), 2000);
        setDuplicate(true);
      }
    }
  };

  return (
    <>
      <MainTemplate>
        {isLoading ? (
          <Block>
            <WelcomWord>회원가입</WelcomWord>
            <SubTitle>
              <h2>정보를 입력해주세요</h2>
            </SubTitle>
            <SubTitle>
              <h3>이메일</h3>
            </SubTitle>
            <EmailArea>
              <span>{safeEmail}</span>
            </EmailArea>
            <SubTitle>
              <h3>닉네임</h3>
            </SubTitle>
            <NicknameInputArea>
              <input
                type="text"
                placeholder="닉네임을 입력해주세요."
                ref={nicknameInput}
              />
            </NicknameInputArea>
            <CheckSignupArea>
              {isDuplicate ? <span>{message}</span> : <span>&nbsp;</span>}
              <RoundButton
                color="blue"
                size="LARGE"
                text="회원가입"
                onClick={signupRequest}
              />
            </CheckSignupArea>
          </Block>
        ) : null}
      </MainTemplate>
    </>
  );
};

export default Signup;
