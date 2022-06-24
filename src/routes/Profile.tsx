import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import RoundImage from '../component/common/RoundImage';
import MainTemplate from '../component/main/MainTemplate';
import Participate from '../container/party/Participate';
import ContentTemplate from '../component/base/ContentTemplate';
import { BaseResponse } from '../lib/api/interface';
import { getUserProfileResponse } from '../lib/api/user';
import { mediaQuery } from '../lib/style/media';
import { User } from '../types/entity';
import Subject from '../component/common/Subject';

const { useState } = React;

const Block = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;

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

const Inner = styled.div`
  height: 100%;
  margin: auto;
`;

const ProfileArea = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5rem;

  img {
    margin-right: 2rem;
  }
`;

const PartyArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const subjectList = [
  { id: '0', name: '생성한 그룹' },
  { id: '1', name: '참여한 그룹' },
];

const Profile = () => {
  const location = useLocation();
  const [activeSubjectID, setActiveSubjectID] = useState('0');
  const [_, __, nickname] = location.pathname.split('/');
  const decodedNickname = decodeURIComponent(nickname.replace('@', ''));

  const { isLoading, data, isError } = useQuery<BaseResponse<User>>(
    ['profile', decodedNickname],
    () => getUserProfileResponse(decodedNickname)
  );

  return (
    <MainTemplate>
      <ContentTemplate>
        {isLoading ? (
          <ProfileArea>zxcv</ProfileArea>
        ) : (
          <Inner>
            <ProfileArea>
              <RoundImage
                src={data.result.profileImage}
                size="LARGE"
              ></RoundImage>
              <h2>{data.result.nickname}</h2>
            </ProfileArea>

            <Subject
              subjectList={subjectList}
              activeSubjectID={activeSubjectID}
              setActiveSubjectID={setActiveSubjectID}
            />
            <PartyArea>
              {activeSubjectID === '0' ? (
                <Participate
                  userID={data.result.id}
                  userNikcname={data.result.nickname}
                  index="0"
                />
              ) : (
                <Participate
                  userID={data.result.id}
                  userNikcname={data.result.nickname}
                  index="1"
                />
              )}
            </PartyArea>
          </Inner>
        )}
      </ContentTemplate>
    </MainTemplate>
  );
};

export default Profile;
