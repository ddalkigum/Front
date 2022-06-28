import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import MainTemplate from '../component/base/MainTemplate';
import NotFound from '../component/error/NotFound';
import WriteLayout from '../container/party/WriteLayout';
import { getUserProfileByToken } from '../lib/api/user';

const Write = () => {
  const { data, isLoading } = useQuery('currentUser', () =>
    getUserProfileByToken()
  );

  if (!isLoading && !data.result) {
    return <NotFound />;
  }

  return (
    <MainTemplate>
      {isLoading ? <div>Loading...</div> : <WriteLayout user={data.result} />}
    </MainTemplate>
  );
};

export default Write;
