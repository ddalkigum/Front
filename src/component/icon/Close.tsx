import React from 'react';
import styled from 'styled-components';

const Icon = styled.svg.attrs({
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 1000 1000',
})``;

const SvgIcon = styled(Icon)`
  cursor: pointer;

  path {
    fill: ${(props) => props.theme.text};
  }
`;

const CloseIcon = ({ onClick, width, height }) => {
  return (
    <SvgIcon onClick={onClick} width={width} height={height}>
      <g>
        <path d="M897.7,979.8L491.6,598.8l-392.4,381L10,892l403.8-392L10,108l89.2-87.8l392.5,381l406.1-381L990,108L572.2,500L990,892L897.7,979.8z" />
      </g>
    </SvgIcon>
  );
};

export default CloseIcon;
