import React from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { currentUser } from '../../atom';
import Subject from '../../component/common/Subject';
import { getUserNotification } from '../../lib/api/party';
import { theme } from '../../style/theme';

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

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  padding: 1.5rem 1rem 0.5rem 1rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  a {
    :hover {
      color: ${theme.azureRadiance};
    }
  }
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
  line-height: 2rem;
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
        <h3>Loading...</h3>
      ) : (
        <CardArea>
          {data.result.map((noti) => {
            return (
              <Card key={noti.notification.id}>
                <TitleArea>
                  <h3>{noti.party.title}</h3>
                </TitleArea>
                <InfoArea>
                  <BookArea>
                    <img src={noti.book.thumbnail} />
                  </BookArea>
                  <OpenChatArea>
                    <h4>오픈챗 링크</h4>
                    <h4>
                      <a href={noti.party.openChatURL}>
                        {noti.party.openChatURL}
                      </a>
                    </h4>
                    <h5>비밀번호: {noti.party.openChatPassword}</h5>
                  </OpenChatArea>
                </InfoArea>
              </Card>
            );
          })}
        </CardArea>
      )}
    </Block>
  );
};

export default NotificationLayout;
