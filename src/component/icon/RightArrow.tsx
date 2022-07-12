import React from 'react';
import { BsChevronRight } from 'react-icons/bs';
import styled from 'styled-components';

const Icon = styled(BsChevronRight)`
  path {
    fill: ${(props) => props.theme.text};
  }

  &.deactive {
    path {
      fill: ${(props) => props.theme.subText};
    }
  }
`;

const LeftArrow = ({
  className,
  size,
  cursor = 'pointer',
  onClick,
}: {
  className: string;
  size: string;
  cursor: string;
  onClick?: () => {};
}) => {
  return (
    <Icon className={className} size={size} onClick={onClick} cursor={cursor} />
  );
};

export default LeftArrow;
