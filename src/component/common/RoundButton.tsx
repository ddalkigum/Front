import React from 'react';
import styled, { css } from 'styled-components';
import { media } from '../../lib/style/media';

type ButtonSize = 'SMALL' | 'DEFAULT' | 'LARGE';
export type Color = 'blue' | 'pink' | 'gray';

interface RoundButtonBlockProps {
  color: Color;
  size: ButtonSize;
  cursor?: string;
  className?: string;
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
  background: ${(props) => {
    if (props.color === 'blue') return props.theme.primary50;
    if (props.color === 'pink') return props.theme.primaryRelative60;
    return props.theme.deactivateButtonBackground;
  }};
  color: ${(props) => props.theme.primaryText};

  :hover {
    background: ${(props) => {
      if (props.color === 'blue') return props.theme.primary40;
      if (props.color === 'pink') return props.theme.primaryRelative70;
      return props.theme.hoverDeactivateButtonBackground;
    }};
    color: ${(props) => props.theme.primaryText};
    cursor: ${(props) => props.cursor ?? 'pointer'};
  }

  &.mobile {
    ${media.small} {
      display: none;
    }
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
  cursor?: string;
}

const RoundButton: React.FC<RoundButtonProps> = ({
  size,
  color,
  text,
  onClick,
  cursor,
  className,
}: RoundButtonProps) => {
  return (
    <RoundButtonBlock
      className={className}
      color={color}
      size={size}
      onClick={onClick}
      cursor={cursor}
    >
      {text}
    </RoundButtonBlock>
  );
};

export default RoundButton;
