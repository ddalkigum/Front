import React from 'react';
import styled, { css } from 'styled-components';

type IconSize = 'SMALL' | 'DEFAULT' | 'LARGE' | 'XLARGE';

// 클릭시 페이지 이동 - to로 관리
interface RoundIconProps {
  size: IconSize;
  src: string;
  to?: string;
}

const Round = styled.img<RoundIconProps>`
  ${(props) =>
    props.size === 'SMALL' &&
    css`
      height: 2rem;
      width: 2rem;
    `}

  ${(props) =>
    props.size === 'DEFAULT' &&
    css`
      height: 3rem;
      width: 3rem;
    `}

  ${(props) =>
    props.size === 'LARGE' &&
    css`
      height: 4rem;
      width: 4rem;
    `}

  ${(props) =>
    props.size === 'XLARGE' &&
    css`
      height: 6rem;
      width: 6rem;
    `}

  display: block;
  padding: 0;
  border-radius: 10rem;
`;

const RoundImage = ({ size, src, to }: RoundIconProps) => {
  return <Round size={size} src={src} to={to}></Round>;
};

export default RoundImage;
