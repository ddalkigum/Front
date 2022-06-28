import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { BsFillCaretDownFill } from 'react-icons/bs';
import RoundButton from '../common/RoundButton';
import { theme } from '../../style/theme';
import { authModalOpen, currentUser } from '../../atom';
import RoundImage from '../common/RoundImage';
import { getUserProfile } from '../../lib/api/user';
import SettingBar from './SettingBar';

const { useState, useEffect } = React;

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
  cursor: pointer;

  h5 {
    padding: 0 0.5rem;
  }
`;

const Header = ({ condition }: { condition?: string }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const [isOpen, setOpen] = useRecoilState(authModalOpen);
  const [user, setUser] = useRecoilState(currentUser);
  const [SettingBarIsOpen, setSettingBarOpen] = useState(false);

  const setUserProfile = async () => {
    let safeUser;
    const localStorageUser = localStorage.getItem('currentUser');

    if (!localStorageUser) {
      safeUser = await getUserProfile();
      if (safeUser === 'DoesNotExistToken') {
        return;
      }
      localStorage.setItem('currentUser', JSON.stringify(safeUser));
      setUser(safeUser);
      return;
    }

    safeUser = JSON.parse(localStorageUser);
    setUser(safeUser);
  };

  useEffect(() => {
    setUserProfile();
  }, []);

  const openLoginModal = () => {
    document.body.style.overflowY = 'hidden';
    setOpen(true);
  };

  const handleSettingCategory = () => {
    setSettingBarOpen(!SettingBarIsOpen);
  };

  const moveWritePage = async () => {
    await setUserProfile();
    navigation('/write');
  };

  const moveHomePage = () => {
    const currentLocation = location.pathname;

    if (currentLocation === '/') {
      return window.location.reload();
    }
    navigation('/');
  };

  return (
    <Block>
      <Inner>
        <Title onClick={moveHomePage}>DeBook</Title>
        {condition === 'signup' ? null : (
          <InfoBox>
            {user ? (
              <>
                <RoundButton
                  color="blue"
                  size="DEFAULT"
                  text="모집하기"
                  onClick={moveWritePage}
                />

                <ProfileBox onClick={handleSettingCategory}>
                  <RoundImage size="SMALL" src={user.profileImage}></RoundImage>
                  <h5>{user.nickname}</h5>
                  <BsFillCaretDownFill color={theme.hoverGray} />
                </ProfileBox>
              </>
            ) : (
              <RoundButton
                color={'blue'}
                size={'DEFAULT'}
                text={'로그인'}
                onClick={openLoginModal}
              />
            )}
          </InfoBox>
        )}
      </Inner>
      <SettingBar isOpen={SettingBarIsOpen} user={user} />
    </Block>
  );
};
export default Header;
