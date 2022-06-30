import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { authModalHandler } from '../../atom';
import { sendEmailResponse } from '../../lib/api/auth';
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
  background: rgba(0, 0, 0, 0.6);
`;

const Modal = styled.div`
  width: 606px;
  height: 480px;
  margin: auto;
  background: white;
  z-index: 3;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
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

const InfoArea = styled.div`
  padding: 1rem 0;
  line-height: 1.5rem;
`;

const ChangeModeText = styled.h3`
  display: inline;
  color: ${theme.azureRadiance};
  cursor: pointer;

  :hover {
    color: ${theme.lochmara};
  }
`;

const SuccessSendMail = styled.div`
  background-color: ${theme.azureRadiance};
  padding: 1rem;
  color: white;
`;

const ErrorMessage = styled.span`
  font-size: 0.875rem;
  color: ${theme.persianPink};
  margin-top: 0.5rem;
`;

const validateEmail = (email: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLocaleLowerCase());
};

const AuthModal: React.FC<{}> = () => {
  const emailInput = React.createRef<HTMLInputElement>();
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

  const sendAuthEmail = async (event) => {
    event.preventDefault();
    const email = emailInput.current.value;
    if (!validateEmail(email)) {
      setIsSafeMail(false);
      return '';
    }

    await sendEmailResponse(email);

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
    <>
      <ModalBlock>
        <Modal>
          <CloseArea>
            <CloseIcon
              onClick={closeModal}
              color={theme.subText}
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
            <EmailInputArea isSafe={isSafeMail} onSubmit={sendAuthEmail}>
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
            <GoogleIcon></GoogleIcon>
          </SocialLoginArea>
          <InfoArea>
            <h5>{mode.info}</h5>
            <ChangeModeText onClick={changeMode}>{mode.to}하기</ChangeModeText>
          </InfoArea>
        </Modal>
      </ModalBlock>
    </>
  ) : null;
};

export default AuthModal;
