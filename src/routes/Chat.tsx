import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { useQuery } from 'react-query';
import MainTemplate from '../component/base/MainTemplate';
import ChatLayout from '../container/setting/ChatLayout';
import { handleAPI } from '../lib/api/common';
import { getUserProfileByToken } from '../lib/api/user';
import NotFound from '../component/error/NotFound';
import ContentTemplate from '../component/base/ContentTemplate';

const { useState, useRef, useEffect } = React;

const socket = io('http://localhost:3002', { reconnection: false });

interface JoinContext {
  slug: string;
  party: { id: string; title: string };
  user: { id: number; nickname: string };
}

const Chat = () => {
  const { data, isLoading } = useQuery(['currentUser'], () =>
    handleAPI(getUserProfileByToken())
  );

  if (!isLoading && !data.result) {
    return <NotFound />;
  }

  return (
    <MainTemplate>
      <ContentTemplate>
        {isLoading ? <div>Loading...</div> : <ChatLayout user={data.result} />}
      </ContentTemplate>
    </MainTemplate>
  );
};

export default Chat;
