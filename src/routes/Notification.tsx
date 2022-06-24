import React from 'react';
import styled from 'styled-components';
import MainTemplate from '../component/main/MainTemplate';
import NotificationLayout from '../container/user/NotificationLayout';
import ProfileBaseTemplate from '../component/base/ContentTemplate';

const Notification = () => {
  return (
    <MainTemplate>
      <ProfileBaseTemplate>
        <NotificationLayout />
      </ProfileBaseTemplate>
    </MainTemplate>
  );
};

export default Notification;
