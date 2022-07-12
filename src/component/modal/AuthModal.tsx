import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { authModalHandler, messageHandler } from '../../atom';
import { config } from '../../config';
import { sendEmailResponse } from '../../lib/api/auth';
import { handleAPI } from '../../lib/api/common';
import { theme } from '../../style/theme';
import RoundButton from '../common/RoundButton';
import CloseIcon from '../icon/Close';
import GoogleIcon from '../icon/Google';

const { useState } = React;

const ModalBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
`;

const Modal = styled.div`
  width: 606px;
  height: 480px;
  margin: auto;
  background: ${(props) => props.theme.mainBackground};
  z-index: 3;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;

  h2,
  h3,
  h4,
  h5,
  h6,
  span,
  input {
    background: inherit;
    color: ${(props) => props.theme.text};
  }
`;

const CloseArea = styled.div`
  display: flex;
  justify-content: right;
  padding: 2rem 0;
`;

const TitleArea = styled.div``;

const SubTitleArea = styled.div`
  padding: 1.5rem 0;
`;

const EmailInputArea = styled.form<{ isSafe: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  input {
    width: 80%;
    outline: none;
    border-bottom: 2px solid
      ${(props) => (props.isSafe ? theme.boldLine : theme.persianPink)};
    font-size: 1rem;

    :focus {
      border-bottom: 2px solid ${theme.azureRadiance};
    }
  }
`;

const SocialLoginArea = styled.div``;

const GoogleButtonArea = styled.a`
  cursor: pointer;
`;

const InfoArea = styled.div`
  padding: 1rem 0;
  line-height: 2rem;
`;

const ChangeModeText = styled.div`
  display: inline;
  color: ${(props) => props.theme.primary50};
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.primary40};
  }
`;

const SuccessSendMail = styled.div`
  background-color: ${(props) => props.theme.primary50};
  padding: 1rem;
  color: ${(props) => props.theme.primaryText};
`;

const ErrorMessage = styled.span`
  font-size: 0.875rem;
  color: ${(props) => props.theme.primaryRelative50};
  margin-top: 0.5rem;
`;

const validateEmail = (email: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLocaleLowerCase());
};

const AuthModal: React.FC<{}> = () => {
  const emailInput = React.createRef<HTMLInputElement>();
  const setMessage = useSetRecoilState(messageHandler);
  const [isOpen, setOpen] = useRecoilState(authModalHandler);
  const [isSignupPage, setSignupPage] = useState(false);
  const [isSendMail, setSendMail] = useState(false);
  const [isSafeMail, setIsSafeMail] = useState(true);

  const closeModal = () => {
    document.body.style.overflowY = null;
    setOpen(false);
    setSendMail(false);
    setIsSafeMail(true);
  };

  const resetErrorMessage = () => {
    setIsSafeMail(true);
  };

  const sendAuthEmail = async (event) => {
    event.preventDefault();
    const email = emailInput.current.value;
    if (!validateEmail(email)) {
      setIsSafeMail(false);
      return '';
    }

    const response = await handleAPI(sendEmailResponse(email));
    const { status, result } = response;

    if (status !== 'Success') {
      setMessage({
        name: 'Errir',
        message: '문제가 발생했습니다\n\r계속 발생한다면 문의메일을 보내주세요',
        status: 'error',
      });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      return;
    }
    setSendMail(!isSendMail);
  };

  const changeMode = () => {
    setSignupPage(!isSignupPage);
    setSendMail(false);
  };

  const signup = { text: '회원가입', info: '이미 회원이신가요?', to: '로그인' };
  const signin = {
    text: '로그인',
    info: '아직 회원이 아니신가요?',
    to: '회원가입',
  };

  const mode = isSignupPage ? signup : signin;

  return isOpen ? (
    <ModalBlock>
      <Modal>
        <CloseArea>
          <CloseIcon
            onClick={closeModal}
            width="1rem"
            height="1rem"
          ></CloseIcon>
        </CloseArea>
        <TitleArea>
          <h2>{mode.text}</h2>
        </TitleArea>
        <SubTitleArea>
          <h4>이메일로 {mode.text}하기</h4>
        </SubTitleArea>
        {isSafeMail ? (
          <ErrorMessage>&nbsp;</ErrorMessage>
        ) : (
          <ErrorMessage>잘못된 형식입니다</ErrorMessage>
        )}
        {isSendMail ? (
          <SuccessSendMail>
            <h4>{mode.text} 링크가 발송되었습니다.</h4>
          </SuccessSendMail>
        ) : (
          <EmailInputArea
            isSafe={isSafeMail}
            onSubmit={sendAuthEmail}
            onChange={resetErrorMessage}
          >
            <input
              type="text"
              placeholder="이메일을 입력해주세요."
              ref={emailInput}
            ></input>
            <RoundButton
              size="DEFAULT"
              color="blue"
              text={mode.text}
              type="submit"
            ></RoundButton>
          </EmailInputArea>
        )}
        <SubTitleArea>
          <h4>소셜계정으로 {mode.text}하기</h4>
        </SubTitleArea>
        <SocialLoginArea>
          <GoogleButtonArea
            href={`${config.server.baseURL}/v1/auth/redirect?provider=google`}
            data-index="google"
          >
            <GoogleIcon></GoogleIcon>
          </GoogleButtonArea>
        </SocialLoginArea>
        <InfoArea>
          <h5>{mode.info}</h5>
          <ChangeModeText onClick={changeMode}>{mode.to}하기</ChangeModeText>
        </InfoArea>
      </Modal>
    </ModalBlock>
  ) : null;
};

export default AuthModal;
