import React from 'react';
import styled from 'styled-components';
import Line from '../../component/common/Line';
import RoundButton from '../../component/common/RoundButton';
import ToggleButton from '../../component/common/ToggleButton';
import { handleAPI } from '../../lib/api/common';
import { getNotify, updateNotify } from '../../lib/api/notify';
import { User } from '../../types/entity';

const { useState, useEffect } = React;

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

  h4 {
    width: 8rem;
  }
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
  const [joinActive, setJoinActive] = useState<boolean>();
  const [activeIsLoading, setActiveLoading] = useState<boolean>(true);

  const handleCustomModal = () => {
    document.body.style.overflowY = 'hidden';
    setCustomModal(true);
  };

  useEffect(() => {
    handleAPI(getNotify()).then(({ status, result }) => {
      setJoinActive(result[0].isActive);
      setActiveLoading(false);
    });
  }, []);

  return (
    <SettingArea>
      <SettingItemArea>
        <h4>이메일</h4>
        <h5>{user.email}</h5>
      </SettingItemArea>
      <Line />
      <SettingItemArea>
        <h4>이메일 수신 설정</h4>
        {activeIsLoading ? (
          <div></div>
        ) : (
          <>
            <h5>가입 알림</h5>
            <ToggleButton
              type="openChat"
              active={joinActive}
              changeAction={updateNotify}
            />
          </>
        )}
      </SettingItemArea>
      <Line />
      <SettingItemArea>
        <h4>회원탈퇴</h4>
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
