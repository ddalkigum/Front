import React from 'react';
import { useLocation } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { currentUser, messageHandler } from '../atom';
import RoundButton from '../component/common/RoundButton';
import RoundImage from '../component/common/RoundImage';
import MainTemplate from '../component/main/MainTemplate';
import { mediaQuery } from '../lib/style/media';

const { useEffect } = React;

const Block = styled.div`
  width: 100%;

  ${mediaQuery(776)} {
    width: 100%;
  }
`;

const Inner = styled.div`
  width: 80%;
  margin-left: 1.5rem;
`;

const ProfileArea = styled.div`
  margin: 5rem 0 0 0;
  display: flex;
  align-items: center;
`;

const ImageArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-right: 2rem;

  img {
    cursor: pointer;
  }
`;

const SettingArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
`;

const SettingItemArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 0;
`;

const Setting = () => {
  const location = useLocation();
  const [user, setUser] = useRecoilState(currentUser);
  const setMessage = useSetRecoilState(messageHandler);
  const nickname = decodeURIComponent(
    location.pathname.split('/')[2].replace('@', '')
  );

  useEffect(() => {
    if (nickname !== user.nickname) {
      setMessage({
        name: 'Forbidden',
        message: '권한이 없습니다',
        status: 'error',
      });
    }
  }, []);

  return (
    <MainTemplate>
      <Block>
        <Inner>
          <ProfileArea>
            <ImageArea>
              <RoundImage size="LARGE" src={user.profileImage} />
              <RoundButton size="SMALL" color="blue" text="이미지 변경" />
            </ImageArea>
            <h2>{user.nickname}</h2>
          </ProfileArea>

          <SettingArea>
            <SettingItemArea>
              <h3>이메일</h3>
              <h4>{user.email}</h4>
            </SettingItemArea>
          </SettingArea>
        </Inner>
      </Block>
    </MainTemplate>
  );
};

export default Setting;
