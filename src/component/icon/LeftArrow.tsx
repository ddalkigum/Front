import React from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import styled from 'styled-components';

const Icon = styled(BsChevronLeft)`
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
