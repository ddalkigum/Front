import React from 'react';
import { useQuery } from 'react-query';
import MainTemplate from '../component/base/MainTemplate';
import NotificationLayout from '../container/setting/NotificationLayout';
import NotFound from '../component/error/NotFound';
import ProfileLayout from '../container/setting/ProfileLayout';
import { handleAPI } from '../lib/api/common';
import { getUserProfileByToken } from '../lib/api/user';
import ContentTemplate from '../component/base/ContentTemplate';

const Notification = () => {
  const { data, isLoading } = useQuery(['currentUser'], () =>
    handleAPI(getUserProfileByToken())
  );

  if (!isLoading && !data.result) {
    return <NotFound />;
  }

  return (
    <MainTemplate>
      <ContentTemplate>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ProfileLayout user={data.result} />
        )}
        <NotificationLayout />
      </ContentTemplate>
    </MainTemplate>
  );
};

export default Notification;
