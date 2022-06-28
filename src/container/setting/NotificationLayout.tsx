import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import NotificationCard from '../../component/card/NotificationCard';
import SkeletonNotificationCard from '../../component/card/SkeletonNotificationCard';
import NoContent from '../../component/common/NoContent';
import Subject from '../../component/common/Subject';
import { getUserNotification } from '../../lib/api/party';

const { useState } = React;

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

const subjectList = [
  {
    id: '0',
    name: '오픈챗',
  },
];

const CardArea = styled.div`
  margin-bottom: 2rem;
`;

const NotificationLayout = () => {
  const [activeSubjectID, setActiveSubjectID] = useState('0');
  const { data, isLoading } = useQuery(['notification'], () =>
    getUserNotification()
  );

  return (
    <Block>
      <Subject
        subjectList={subjectList}
        activeSubjectID={activeSubjectID}
        setActiveSubjectID={setActiveSubjectID}
      />
      {isLoading ? (
        Array.from({ length: 6 }).map((value, index) => {
          return <SkeletonNotificationCard key={index} />;
        })
      ) : data.result.length ? (
        <CardArea>
          {data.result.map((data) => {
            return (
              <NotificationCard
                key={data.notification.id}
                party={data.party}
                book={data.book}
              />
            );
          })}
        </CardArea>
      ) : (
        <NoContent message="아직 참여한 그룹이 없네요 🥲" />
      )}
    </Block>
  );
};

export default NotificationLayout;
