import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import Line from '../common/Line';
import RoundImage from '../common/RoundImage';

const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const PartyArea = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const PartyThumbnail = styled.img`
  width: calc(775px / 2 - 1rem);
  height: 10rem;
`;

const PartyTitle = styled.div`
  margin-top: 1rem;
  padding: 0 1rem;
`;

const PartyCreated = styled.div`
  margin: 1rem 0;
  padding: 0 1rem;
  color: ${theme.boldLine};
`;

const OwnerArea = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;

  h5 {
    margin-left: 1rem;
  }
`;

const RelationGroup = () => {
  const groupList = [
    {
      id: 1,
      src: 'http://image.yes24.com/goods/92742567/XL',
      title: '제목은 최대 25글자 지금까지 25글자123',
      createdAt: '2022년 4월 30일',
      ownerProfileImage: 'https://cdn.debook.me/default/default_user.png',
      ownerNickname: '딸기검',
    },
    {
      id: 2,
      src: 'http://image.yes24.com/goods/92742567/XL',
      title: '제목은 최대 25글자 지금까지 25글자123',
      createdAt: '2022년 4월 30일',
      ownerProfileImage: 'https://cdn.debook.me/default/default_user.png',
      ownerNickname: '딸기검',
    },
    {
      id: 3,
      src: 'http://image.yes24.com/goods/92742567/XL',
      title: '제목은 최대 25글자 지금까지 25글자123',
      createdAt: '2022년 4월 30일',
      ownerProfileImage: 'https://cdn.debook.me/default/default_user.png',
      ownerNickname: '딸기검',
    },
    {
      id: 4,
      src: 'http://image.yes24.com/goods/92742567/XL',
      title: '제목',
      createdAt: '2022년 4월 30일',
      ownerProfileImage: 'https://cdn.debook.me/default/default_user.png',
      ownerNickname: '딸기검',
    },
    {
      id: 5,
      src: 'http://image.yes24.com/goods/92742567/XL',
      title: '제목',
      createdAt: '2022년 4월 30일',
      ownerProfileImage: 'https://cdn.debook.me/default/default_user.png',
      ownerNickname: '딸기검',
    },
  ];

  return (
    <Block>
      {groupList.map((group) => {
        return (
          <PartyArea key={group.id}>
            <PartyThumbnail src={group.src} />
            <PartyTitle>
              <h4>{group.title}</h4>
            </PartyTitle>
            <PartyCreated>
              <h5>{group.createdAt}</h5>
            </PartyCreated>
            <Line />
            <OwnerArea>
              <RoundImage size="SMALL" src={group.ownerProfileImage} />
              <h5>{group.ownerNickname}</h5>
            </OwnerArea>
          </PartyArea>
        );
      })}
    </Block>
  );
};

export default RelationGroup;
