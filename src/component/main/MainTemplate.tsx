import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';

export interface MainTemplateProps {
  children: React.ReactNode;
}

const Block = styled.div`
  background-color: ${theme.homeBackground};
`;

const MainTemplate = ({ children }: MainTemplateProps) => {
  return <Block>{children}</Block>;
};

export default MainTemplate;
