import React from 'react';
import styled from 'styled-components';

const LineArea = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.line};
`;

const Line = () => {
  return <LineArea></LineArea>;
};

export default Line;
