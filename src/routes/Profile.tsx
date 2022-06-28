import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import MainTemplate from '../component/base/MainTemplate';
import ContentTemplate from '../component/base/ContentTemplate';
import { BaseResponse } from '../lib/api/interface';
import { getUserProfileResponse } from '../lib/api/user';
import { User } from '../types/entity';
import Subject from '../component/common/Subject';
import { handleAPI } from '../lib/api/common';
import NotFound from '../component/error/NotFound';
import ProfileLayout from '../container/setting/ProfileLayout';
import ParticipateParty from '../container/setting/ParticipateParty';

const { useState } = React;

const PartyArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const subjectList = [
  { id: '0', name: '생성한 그룹', description: 'create' },
  { id: '1', name: '참여한 그룹', description: 'join' },
];

const Profile = () => {
  const location = useLocation();
  const [activeSubjectID, setActiveSubjectID] = useState('0');
  const [_, __, nickname] = location.pathname.split('/');
  const decodedNickname = decodeURIComponent(nickname.replace('@', ''));

  const { isLoading, data, isError } = useQuery<BaseResponse<User>>(
    ['profile', decodedNickname],
    () => handleAPI(getUserProfileResponse(decodedNickname))
  );

  if (!isLoading && data.result.name === 'NotFound') {
    return <NotFound />;
  }

  return (
    <MainTemplate>
      <ContentTemplate>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <ProfileLayout user={data.result} />
            <Subject
              subjectList={subjectList}
              activeSubjectID={activeSubjectID}
              setActiveSubjectID={setActiveSubjectID}
            />
            <ParticipateParty
              user={data.result}
              subjectIndex={activeSubjectID}
            />
          </>
        )}
      </ContentTemplate>
    </MainTemplate>
  );
};

export default Profile;
