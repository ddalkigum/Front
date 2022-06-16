import React from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Header from '../component/base/Header';
import MainTemplate from '../component/main/MainTemplate';
import DetailPageLayout from '../container/party/DetailLayout';

const Detail = () => {
  const location = useLocation();
  const [_, nickname, title] = location.pathname.split('/');
  const decodedNickname = decodeURIComponent(nickname);
  const decodedTitle = decodeURIComponent(title);

  return (
    <MainTemplate>
      <Header></Header>
      <DetailPageLayout nickname={decodedNickname} title={decodedTitle} />
    </MainTemplate>
  );
};

export default Detail;
