import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  padding: 1.5rem 1rem 0.5rem 1rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  a {
    :hover {
      color: ${(props) => props.theme.primary50};
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

const NotificationCard = ({ party, book }) => {
  return (
    <Card>
      <TitleArea>
        <h3>{party.title}</h3>
      </TitleArea>
      <InfoArea>
        <BookArea>
          <img src={book.thumbnail} />
        </BookArea>
        <OpenChatArea>
          <h4>오픈챗 링크</h4>
          <h4>
            <a href={party.openChatURL}>{party.openChatURL}</a>
          </h4>
          <h5>비밀번호: {party.openChatPassword}</h5>
        </OpenChatArea>
      </InfoArea>
    </Card>
  );
};

export default NotificationCard;
