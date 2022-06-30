import React from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { userHandler, messageHandler } from '../atom';
import RoundButton, { Color } from '../component/common/RoundButton';
import MainTemplate from '../component/base/MainTemplate';
import { uploadImage } from '../lib/api/image';
import {
  deactivateUserResponse,
  getUserProfileByToken,
  updateUserProfileResponse,
} from '../lib/api/user';
import { deepClone } from '../lib/common';
import { User } from '../types/entity';
import ContentTemplate from '../component/base/ContentTemplate';
import NotFound from '../component/error/NotFound';
import ProfileLayout from '../container/setting/ProfileLayout';
import { handleAPI } from '../lib/api/common';
import CustomModal from '../component/modal/CustomModal';
import SettingLayout from '../container/setting/SettingLayout';

const { useState } = React;

const ButtonArea = styled.div`
  margin-top: 1rem;
`;

const Setting = () => {
  const [user, setUser] = useRecoilState(userHandler);
  const [isOpenCustomModal, setCustomModal] = useState(false);
  const setMessage = useSetRecoilState(messageHandler);
  const [uploadButton, setUploadButton] = useState<{
    name: string;
    color: Color;
  }>({
    name: '이미지 변경',
    color: 'blue',
  });

  const { data, isLoading } = useQuery(['currentUser'], () =>
    handleAPI(getUserProfileByToken())
  );

  if (!isLoading && !data.result) {
    return <NotFound />;
  }

  const updateProfileImage = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const input = document.createElement('input');
    input.accept = 'image/*';

    input.type = 'file';
    input.onchange = async () => {
      setUploadButton({ name: '업로드 중...', color: 'gray' });
      const response = await handleAPI(
        uploadImage(data.result, input.files[0], 'profile')
      );

      if (response.result.message === 'NotSupportedType') {
        setMessage({
          name: 'fail',
          message: 'png, jpg, jpeg형식만 가능해요',
          status: 'error',
        });

        setTimeout(() => {
          setMessage(null);
        }, 1500);
        return;
      }
      const imageURL = response.result;
      const updatedUser = deepClone<User>(data.result);
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

  const deactivate = async () => {
    await deactivateUserResponse();
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <MainTemplate>
      <CustomModal
        acceptEvent={deactivate}
        isOpen={isOpenCustomModal}
        setOpen={setCustomModal}
        title="회원 탈퇴"
        message="탈퇴하시겠습니까?"
      />
      <ContentTemplate>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <ProfileLayout user={data.result} />
            <ButtonArea>
              <RoundButton
                color="blue"
                size="DEFAULT"
                text="이미지 변경"
                onClick={updateProfileImage}
              />
            </ButtonArea>
            <SettingLayout
              user={data.result}
              isOpenCustomModal={isOpenCustomModal}
              setCustomModal={setCustomModal}
            />
          </>
        )}
      </ContentTemplate>
    </MainTemplate>
  );
};

export default Setting;
