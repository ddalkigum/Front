import React from 'react';
import Header from '../component/base/Header';
import MainTemplate from '../component/main/MainTemplate';
import HomeLayout from '../container/home/HomeLayout';

const Home = (): JSX.Element => {
  return (
    <MainTemplate>
      <Header></Header>
      <HomeLayout></HomeLayout>
    </MainTemplate>
  );
};

export default Home;
