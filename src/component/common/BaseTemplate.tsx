import React from 'react';
import styled from 'styled-components';
import { mediaQuery } from '../../lib/style/media';

const Block = styled.div`
  width: 100%;
  margin: auto;

  ${mediaQuery(1919)} {
    width: 1376px;
  }
  ${mediaQuery(1440)} {
    width: 1024px;
  }
  ${mediaQuery(1056)} {
    width: calc(100% - 2rem);
  }
`;

const Inner = styled.div`
  width: 775px;
  max-width: 100%;
  height: 100%;
  margin: auto;
`;

const BaseTemplate = ({ children }) => {
  return (
    <Block>
      <Inner>{children}</Inner>
    </Block>
  );
};

export default BaseTemplate;
