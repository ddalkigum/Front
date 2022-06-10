import React from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Header from '../component/base/Header';
import MainTemplate from '../component/main/MainTemplate';
import DetailPageLayout from '../container/party/DetailLayout';

const Detail = () => {
  const location = useLocation();
  const [_, nickname, title] = location.pathname.split('/');

  return (
    <MainTemplate>
      <Header></Header>
      <DetailPageLayout />
    </MainTemplate>
  );
};

export default Detail;
