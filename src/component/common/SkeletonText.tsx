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

const Block = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Text = styled.div<{ textLength }>`
  width: ${(props) => props.textLength + 'rem'};
  height: 0.75rem;
  background: ${theme.boldLine};
  animation: ${bling} 1s ease-in-out infinite;
`;

const SkeletonText = ({ textLength }: { textLength: string[] }) => {
  return (
    <Block>
      {textLength.map((length, index) => {
        return <Text key={index} textLength={length}></Text>;
      })}
    </Block>
  );
};
export default SkeletonText;
