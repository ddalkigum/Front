import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import Header from '../base/Header';
import ShowingMessage from '../common/Message';

export interface MainTemplateProps {
  children: React.ReactNode;
}

const Block = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding-bottom: 5rem;
  background-color: ${theme.homeBackground};
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
      <Footer></Footer>
    </Block>
  );
};

export default MainTemplate;
