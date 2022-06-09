import React from 'react';
import styled, { css } from 'styled-components';
import { buttonColor } from '../../style/theme';

type ButtonSize = 'SMALL' | 'DEFAULT' | 'LARGE';
export type Color = 'blue' | 'pink' | 'gray';

interface RoundButtonBlockProps {
  color: Color;
  size: ButtonSize;
}

const RoundButtonBlock = styled.button<RoundButtonBlockProps>`
  ${(props) =>
    props.size === 'SMALL' &&
    css`
      height: 1.5rem;
      padding: 0rem 0.75rem;
      font-size: 0.875rem;
      border-radius: 0.75rem;
    `};
  ${(props) =>
    props.size === 'DEFAULT' &&
    css`
      height: 2rem;
      padding: 0rem 1rem;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 1rem;
    `}
  ${(props) =>
    props.size === 'LARGE' &&
    css`
      height: 3rem;
      padding: 0rem 2rem;
      font-size: 1.5rem;
      font-weight: bold;
      border-radius: 1.5rem;
    `}
  background: none;
  border: none;
  outline: none;
  word-break: keep-all;
  background: ${(props) => buttonColor[props.color].background};
  color: ${(props) => buttonColor[props.color].color};
  :hover {
    background: ${(props) => buttonColor[props.color].hoverBackground};
    color: ${buttonColor.blue.color};
    cursor: pointer;
  }
`;

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface RoundButtonProps extends ButtonProps {
  size: ButtonSize;
  color: Color;
  text: string;
}

const RoundButton: React.FC<RoundButtonProps> = ({
  size,
  color,
  text,
  onClick,
}: RoundButtonProps) => {
  return (
    <RoundButtonBlock color={color} size={size} onClick={onClick}>
      {text}
    </RoundButtonBlock>
  );
};

export default RoundButton;
