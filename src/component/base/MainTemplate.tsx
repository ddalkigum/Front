import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import Header from './Header';
import ShowingMessage from '../common/Message';

export interface MainTemplateProps {
  children: React.ReactNode;
}

const Block = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding-bottom: 5rem;
  background-color: ${(props) => props.theme.mainBackground};

  * {
    color: ${(props) => props.theme.text};
  }
`;

const Footer = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  height: 6rem;
`;

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <Block>
      <Header />
      {children}
      <ShowingMessage />
    </Block>
  );
};

export default MainTemplate;
