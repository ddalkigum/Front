import React from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { currentUser } from '../../atom';
import { logoutResponse } from '../../lib/api/auth';
import { theme } from '../../style/theme';

type CategoryIndex = 'logout' | 'profile' | 'setting' | 'notification';

const categoryList: {
  id: string;
  name: string;
  'data-index': CategoryIndex;
}[] = [
  { id: '0', name: '알림', 'data-index': 'notification' },
  { id: '1', name: '프로필 보기', 'data-index': 'profile' },
  { id: '2', name: '프로필 설정', 'data-index': 'setting' },
  { id: '3', name: '로그아웃', 'data-index': 'logout' },
];

const Block = styled.div<{ isOpen }>`
  position: absolute;
  height: fit-content;
  z-index: 1;
  width: 12rem;
  right: 1.125rem;
  background: ${theme.homeBackground};
  ${(props) =>
    props.isOpen
      ? css`
          border: 1px solid ${theme.boldLine};
        `
      : css`
          border: none;
        `};
`;

const CategoryArea = styled.li`
  font-size: 0.875rem;
  padding: 1.125rem 0 1.125rem 1rem;
  cursor: pointer;

  :hover {
    background: ${theme.line};
  }
`;

const SettingBar = ({ isOpen, user }) => {
  const setUser = useSetRecoilState(currentUser);
  const navigation = useNavigate();

  const clearUserHistory = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const logout = async () => {
    await logoutResponse();
    clearUserHistory();
    window.location.reload();
  };

  const moveProfilePage = () => {
    navigation(`/@${user.nickname}`);
  };

  const moveSettingPage = () => {
    navigation(`/setting/@${user.nickname}`);
  };

  const moveRequestPage = () => {
    navigation(`/notification/@${user.nickname}`);
  };

  const handleClickCategory = async (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const dataIndex = event.currentTarget.getAttribute(
      'data-index'
    ) as CategoryIndex;

    switch (dataIndex) {
      case 'notification':
        await moveRequestPage();
        break;
      case 'logout':
        await logout();
        break;
      case 'profile':
        moveProfilePage();
        break;
      case 'setting':
        moveSettingPage();
        break;
      default:
        moveProfilePage();
        break;
    }
  };

  return (
    <Block isOpen={isOpen}>
      {isOpen ? (
        <ul>
          {categoryList.map((category) => {
            return (
              <CategoryArea
                onClick={handleClickCategory}
                data-index={category['data-index']}
                key={category.id}
              >
                {category.name}
              </CategoryArea>
            );
          })}
        </ul>
      ) : null}
    </Block>
  );
};

export default SettingBar;
