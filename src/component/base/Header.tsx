import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import RoundButton from '../common/RoundButton';
import { theme } from '../../style/theme';
import { authModalOpen, isSafeUser } from '../../atom';
import { checkLoginResponse, logoutResponse } from '../../lib/api/auth';
import RoundImage from '../common/RoundImage';
import { config } from '../../config';

const { useState } = React;

const Block = styled.div`
  height: 4rem;
  margin: auto;
`;

const Inner = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  color: ${theme.text};
  font-size: 2rem;
  cursor: pointer;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;

  button {
    margin: 0.5rem;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;

  h4 {
    padding: 0 0.5rem;
  }
`;

interface CurrentUser {
  id: number;
  nickname: string;
  profileImage: string;
}

const Header = () => {
  const navigation = useNavigate();
  const [isOpen, setOpen] = useRecoilState(authModalOpen);
  const [isSafe, setSafe] = useRecoilState(isSafeUser);
  const [user, setUser] = useState<CurrentUser>({
    id: 0,
    nickname: '',
    profileImage: '',
  });

  const setUserProfile = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      setUser(currentUser);
      setSafe(true);
    }
  };

  useEffect(() => {
    setUserProfile();
  }, []);

  const openLoginModal = () => {
    setOpen(true);
  };

  const logout = async () => {
    const response = await logoutResponse();
    setSafe(false);
  };

  const moveProfilPage = () => {
    navigation(`/${user.nickname}`);
  };

  const moveWritePage = () => {
    navigation('/write');
  };

  const moveHomePage = () => {
    navigation('/');
  };

  return (
    <Block>
      <Inner>
        <Title onClick={moveHomePage}>DeBook</Title>
        <InfoBox>
          <RoundButton
            color="blue"
            size="DEFAULT"
            text="모집하기"
            onClick={moveWritePage}
          />
          {isSafe ? (
            <ProfileBox onClick={moveProfilPage}>
              <RoundImage size="DEFAULT" src={user.profileImage}></RoundImage>
              <h4>{user.nickname}</h4>
            </ProfileBox>
          ) : (
            <RoundButton
              color={'blue'}
              size={'DEFAULT'}
              text={'로그인'}
              onClick={openLoginModal}
            />
          )}
        </InfoBox>
      </Inner>
    </Block>
  );
};
export default Header;
