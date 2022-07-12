import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import RoundButton from '../common/RoundButton';

const ModalBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: rgba(0, 0, 0, 0.6);
`;

const Block = styled.div`
  width: 400px;
  height: 180px;
  background: ${(props) => props.theme.mainBackground};
`;

const Inner = styled.div`
  padding: 2rem;

  h3 {
    margin-bottom: 1rem;
  }

  h4 {
    margin-bottom: 2rem;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 1rem;
  }
`;

const CustomModal = ({ title, message, isOpen, setOpen, acceptEvent }) => {
  const closeModal = () => {
    document.body.style.overflowY = null;
    setOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <ModalBlock>
          <Block>
            <Inner>
              <h3>{title}</h3>
              <h4>{message}</h4>
              <ButtonArea>
                <RoundButton
                  size="DEFAULT"
                  color="gray"
                  text="취소"
                  onClick={closeModal}
                />
                <RoundButton
                  size="DEFAULT"
                  color="blue"
                  text="확인"
                  onClick={acceptEvent}
                />
              </ButtonArea>
            </Inner>
          </Block>
        </ModalBlock>
      ) : null}
    </>
  );
};

export default CustomModal;
