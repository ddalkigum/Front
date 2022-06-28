import React from 'react';
import styled from 'styled-components';
import Skeleton from '../common/Skeleton';
import SkeletonText from '../common/SkeletonText';

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  padding: 1.5rem 1rem 0.5rem 1rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const TitleArea = styled.div`
  width: 100%;
  padding-bottom: 1rem;
  h3 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const BookArea = styled.div`
  margin-right: 1.5rem;

  img {
    width: 4rem;
    height: 6rem;
  }
`;

const InfoArea = styled.div`
  display: flex;
`;

const OpenChatArea = styled.div`
  display: flex;
  flex-direction: column;

  div {
    margin-bottom: 0.5rem;
  }
`;
const SkeletonNotificationCard = () => {
  return (
    <Card>
      <TitleArea>
        <Skeleton width="90%" height="1.5rem" />
      </TitleArea>
      <InfoArea>
        <BookArea>
          <Skeleton width="4rem" height="6rem" />
        </BookArea>

        <OpenChatArea>
          <SkeletonText textLength={['3', '2']} />
          <SkeletonText textLength={['20']} />
          <SkeletonText textLength={['5', '10']} />
        </OpenChatArea>
      </InfoArea>
    </Card>
  );
};

export default SkeletonNotificationCard;
