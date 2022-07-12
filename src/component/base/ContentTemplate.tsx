import React from 'react';
import styled from 'styled-components';
import { mediaQuery } from '../../lib/style/media';

const Block = styled.div`
  width: 1024px;
  margin: auto;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  input,
  span,
  a {
    color: ${(props) => props.theme.text};
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

const ContentTemplate = ({ children }) => {
  return (
    <Block>
      <Inner>{children}</Inner>
    </Block>
  );
};

export default ContentTemplate;
