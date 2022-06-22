import React from 'react';
import styled from 'styled-components';
import Header from '../component/base/Header';
import MainTemplate from '../component/main/MainTemplate';
import HomeLayout from '../container/home/HomeLayout';
import { mediaQuery } from '../lib/style/media';

const { useEffect } = React;

const Block = styled.div`
  width: 100%;
  margin: 5rem auto;
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

const Home = (): JSX.Element => {
  return (
    <MainTemplate>
      <Block>
        <HomeLayout></HomeLayout>
      </Block>
    </MainTemplate>
  );
};

export default Home;
