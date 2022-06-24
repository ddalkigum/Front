import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { currentUser, messageHandler } from '../atom';
import RoundButton, { Color } from '../component/common/RoundButton';
import RoundImage from '../component/common/RoundImage';
import MainTemplate from '../component/main/MainTemplate';
import { uploadImage } from '../lib/api/image';
import {
  getUserProfileByToken,
  getUserProfileResponse,
  updateUserProfileResponse,
} from '../lib/api/user';
import { deepClone } from '../lib/common';
import { mediaQuery } from '../lib/style/media';
import { User } from '../types/entity';

const { useState } = React;

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
  const setMessage = useSetRecoilState(messageHandler);
  const setUser = useSetRecoilState(currentUser);
  const [uploadButton, setUploadButton] = useState<{
    name: string;
    color: Color;
  }>({
    name: '이미지 변경',
    color: 'blue',
  });
  const { data, isLoading } = useQuery(['currentUser'], () =>
    getUserProfileByToken()
  );

  let user;
  if (!isLoading) {
    user = data.result;
  }
  const updateProfileImage = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const input = document.createElement('input');
    input.accept = 'image/*';

    input.type = 'file';
    input.onchange = async () => {
      setUploadButton({ name: '업로드 중...', color: 'gray' });
      const response = await uploadImage(user, input.files[0], 'profile');

      const imageURL = response.result;
      const updatedUser = deepClone<User>(user);
      updatedUser.profileImage = imageURL;

      await updateUserProfileResponse({ profileImage: imageURL });

      setTimeout(() => {
        setUser(updatedUser);
        setUploadButton({ name: '이미지 변경', color: 'blue' });
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }, 1500);
    };
    input.click();
  };

  return (
    <MainTemplate>
      <Block>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Inner>
            <ProfileArea>
              <ImageArea>
                <RoundImage size="XLARGE" src={user.profileImage} />
                <RoundButton
                  size="DEFAULT"
                  color={uploadButton.color}
                  text={uploadButton.name}
                  onClick={updateProfileImage}
                />
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
        )}
      </Block>
    </MainTemplate>
  );
};

export default Setting;
