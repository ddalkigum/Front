import React from 'react';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import styled, { css, keyframes } from 'styled-components';
import { userHandler } from '../../atom';
import { logoutResponse } from '../../lib/api/auth';
import { media, mediaQuery } from '../../lib/style/media';

const { useState } = React;

const open = keyframes`
  0% {
    transform: translateY(0) scale(0.1)
  }
  100% {
    transform: translateY(65%) translateY(0) scale(1)
  }
`;

const Block = styled.div<{ isOpen }>`
  position: absolute;
  height: fit-content;
  z-index: 1;
  width: 12rem;
  right: 1.125rem;
  background: ${(props) => props.theme.cardBackground};
  transform: translateY(65%);

  ${(props) =>
    props.isOpen
      ? css`
          border: 1px solid ${({ theme }) => theme.line};
          animation: ${open} 0.2s ease-in-out;
        `
      : css`
          border: none;
        `};
`;

const CategoryArea = styled.a`
  display: block;
  font-size: 0.875rem;
  padding: 1.125rem 0 1.125rem 1rem;
  color: ${(props) => props.theme.text};

  :hover {
    background: ${(props) => props.theme.line};
  }

  &.mobile {
    display: none;
    ${media.small} {
      display: block;
    }
  }
`;

const SettingBar = ({ isOpen, user }) => {
  const setUser = useSetRecoilState(userHandler);
  const [size, setSize] = useState(window.innerWidth);

  const clearUserHistory = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const logout = async () => {
    await logoutResponse();
    clearUserHistory();
    window.location.reload();
  };

  const categoryList = [
    {
      id: '0',
      name: '알림',
      'data-index': 'notification',
      href: '/notification',
    },

    {
      id: '1',
      name: '프로필 보기',
      'data-index': 'profile',
      href: `/profile/@${user.nickname}`,
    },
    { id: '2', name: '프로필 설정', 'data-index': 'setting', href: '/setting' },
  ];

  return (
    <Block isOpen={isOpen}>
      {isOpen ? (
        <ul>
          <li id="write">
            <CategoryArea className="mobile" href="/write">
              모집하기
            </CategoryArea>
          </li>
          {categoryList.map((category) => {
            return (
              <li data-index={category['data-index']} key={category.id}>
                <CategoryArea href={category.href}>
                  {category.name}
                </CategoryArea>
              </li>
            );
          })}
          <li id="logout">
            <CategoryArea style={{ cursor: 'pointer' }} onClick={logout}>
              로그아웃
            </CategoryArea>
          </li>
        </ul>
      ) : null}
    </Block>
  );
};

export default SettingBar;
