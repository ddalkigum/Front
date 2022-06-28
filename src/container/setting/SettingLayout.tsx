import React from 'react';
import styled from 'styled-components';
import RoundButton from '../../component/common/RoundButton';
import { User } from '../../types/entity';

const { useState } = React;

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

const WarningMessage = styled.h5`
  color: gray;
`;

const SettingLayout = ({
  user,
  setCustomModal,
  isOpenCustomModal,
}: {
  user: User;
  isOpenCustomModal: boolean;
  setCustomModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleCustomModal = () => {
    document.body.style.overflowY = 'hidden';
    setCustomModal(true);
  };

  return (
    <SettingArea>
      <SettingItemArea>
        <h3>이메일</h3>
        <h4>{user.email}</h4>
      </SettingItemArea>
      <SettingItemArea>
        <h3>회원탈퇴</h3>
        <RoundButton
          color="pink"
          size="DEFAULT"
          text="회원탈퇴"
          onClick={handleCustomModal}
        />
      </SettingItemArea>
      <WarningMessage>
        탈퇴 시 모든 기록이 삭제되며, 복구되지 않습니다{' '}
      </WarningMessage>
    </SettingArea>
  );
};

export default SettingLayout;
