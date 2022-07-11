import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css, keyframes } from 'styled-components';
import { messageHandler } from '../../atom';
import { theme } from '../../style/theme';

const { useState } = React;

const Block = styled.div`
  width: 100%;
  position: fixed;
  bottom: 1rem;
  z-index: 5;
`;

const fadeIn = keyframes`
 0% {
   opacity: 0;
   transform: translateY(100px)
 }

 50% {
  opacity: 1;
  transform: translateY(0%);
 }

 70% {
   opacity: 0.7;
  };
`;

const MessageArea = styled.div<{ isOpen; status }>`
  background: ${(props) =>
    props.status === 'success' ? theme.azureRadiance : theme.persianPink};
  color: ${(props) =>
    props.status === 'success'
      ? props.theme.primaryText
      : props.theme.primaryRelativeText};
  text-align: center;
  line-height: 2;
  white-space: pre-line;
  border-radius: 1rem;
  margin: auto;
  width: fit-content;
  padding: 1rem 2rem;
  animation: ${fadeIn} 1s ease-in-out;
`;

const ShowingMessage = () => {
  const showingCondition = useRecoilValue(messageHandler);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (showingCondition) {
      setOpen(true);
      setTimeout(() => setOpen(false), 2000);
    }
  }, [open]);

  return (
    <Block>
      {showingCondition ? (
        <MessageArea isOpen={open} status={showingCondition.status}>
          {showingCondition.message}
        </MessageArea>
      ) : null}
    </Block>
  );
};

export default ShowingMessage;
