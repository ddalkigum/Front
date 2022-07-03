import React from 'react';
import { useLocation } from 'react-router';
import MainTemplate from '../component/base/MainTemplate';
import DetailPageLayout from '../container/party/DetailLayout';

const Detail = () => {
  const location = useLocation();
  const [_, nickname, slug] = location.pathname.split('/');
  const decodedNickname = decodeURIComponent(nickname.replace('@', ''));
  const decodedSlug = decodeURIComponent(slug);

  return (
    <MainTemplate>
      <DetailPageLayout nickname={decodedNickname} slug={decodedSlug} />
    </MainTemplate>
  );
};

export default Detail;
