import React from 'react';
import styled from 'styled-components';
import { mediaQuery } from '../../lib/style/media';
import { theme } from '../../style/theme';
import Line from '../common/Line';
import Skeleton from '../common/Skeleton';
import SkeletonText from '../common/SkeletonText';

const Block = styled.div`
  width: calc(24% - 1rem);
  height: 100%;

  ${mediaQuery(1920)} {
    width: calc(32% - 1rem);
  }

  ${mediaQuery(1440)} {
    width: calc(50% - 1rem);
  }

  ${mediaQuery(767)} {
    width: 100%;
    margin: 0;
  }
  background: ${theme.line};
  border-radius: 10px;
`;

const InfoArea = styled.div`
  padding: 0.875rem 0.875rem 0rem;
`;

const TitleArea = styled.div`
  padding-bottom: 0.875rem;
`;

const BookArea = styled.div`
  display: flex;
`;

const BookInfoArea = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  padding-left: 0.875rem;
  gap: 1rem;
`;

const SubInfoArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0rem;
`;

const AddressArea = styled.div`
  padding-top: 1rem;
`;

const UserInfoArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const AdminInfoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const AdminNickname = styled.h5`
  margin-left: 0.5rem;
`;

const SkeletonCard = () => {
  return (
    <Block>
      <InfoArea>
        <TitleArea>
          <Skeleton width="90%" height="1.5rem" />
        </TitleArea>
        <BookArea>
          <Skeleton width="3rem" height="4rem" />
          <BookInfoArea>
            <SkeletonText textLength={['12']} />
            <SkeletonText textLength={['2']} />
          </BookInfoArea>
        </BookArea>
        <AddressArea>
          <SkeletonText textLength={['3', '3', '3']} />
        </AddressArea>
        <SubInfoArea>
          <SkeletonText textLength={['12']} />
          <Skeleton width="3rem" height="1.25rem" borderRadius="10px" />
        </SubInfoArea>
      </InfoArea>
      <Line />
      <UserInfoArea>
        <AdminInfoArea>
          <Skeleton width="2rem" height="2rem" isCircle={true} />
          <SkeletonText textLength={['5']} />
        </AdminInfoArea>
      </UserInfoArea>
    </Block>
  );
};

export default SkeletonCard;
