import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../style/theme';

const bling = keyframes`
  0% {
    opacity: 50%;
  }

  50% {
    opacity: 100%;
  }

  100% {
    opacity: 50%;
  }
`;

const Block = styled.div<{ isCircle: boolean }>`
  background: ${theme.boldLine};
  border-radius: ${(props) => (props.isCircle ? '50%' : 0)};
  animation: ${bling} 1s ease-in-out infinite;
`;

const Skeleton = ({
  width,
  height,
  borderRadius = '5px',
  isCircle = false,
}) => {
  return (
    <Block style={{ width, height, borderRadius }} isCircle={isCircle}></Block>
  );
};

export default Skeleton;
