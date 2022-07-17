import React from 'react';
import { BiMenu, BiSend } from 'react-icons/bi';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { BaseInput } from '../../component/base/Input';
import Line from '../../component/common/Line';
import LeftArrow from '../../component/icon/LeftArrow';
import { handleAPI } from '../../lib/api/common';
import { getParticipatePartyList } from '../../lib/api/party';
import { User } from '../../types/entity';
import { media } from '../../lib/style/media';

const { useState, useEffect } = React;

const XSMALL = 550;

const Block = styled.div`
  display: flex;
  max-width: 100%;
  margin-top: 5rem;
  background: ${(props) => props.theme.cardBackground};
  height: 40rem;
  max-height: 100%;
  overflow-x: hidden;
`;

const JoinListArea = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  overflow: scroll;

  ${media.test} {
    position: absolute;
    transform: translateX(-110%);
  }
`;

const ChatRoomArea = styled.div`
  background: gray;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
  height: 100%;

  ${media.test} {
    width: 100%;
  }
`;

const ChatItemArea = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  :hover {
    background: ${(props) => props.theme.line};
  }
`;

const ChatItemInner = styled.div`
  padding: 1rem 0.5rem;
`;

const ChatNavArea = styled.div`
  height: 3rem;
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const MessageArea = styled.div``;

const SendArea = styled.div`
  height: 3rem;
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  color: white;
`;

const BookArea = styled.div`
  display: flex;
`;

const BookImage = styled.img`
  width: 3rem;
  height: 4rem;
`;

const BookInfoArea = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  padding-left: 0.875rem;
`;

const BookTitle = styled.h5`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const BookWriter = styled.h6`
  margin-top: 0.25rem;
`;

const MessageInput = styled(BaseInput)``;

const ChatLayout = ({ user }: { user: User }) => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [className, setClassName] = useState<string>();
  const [title, setTitle] = useState<string>();

  const { data, isLoading } = useQuery(
    [user.nickname, 'participatePartyList'],
    () => handleAPI(getParticipatePartyList(user.id))
  );

  const handleResize = () => {
    setWidth(window.innerWidth);
    if (window.innerWidth < XSMALL) {
      setClassName('active');
    } else {
      setClassName('deactive');
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  const changeRoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickedPartyTitle = event.currentTarget.getAttribute('data-index');
    setTitle(clickedPartyTitle);
  };

  const sub = (event) => {
    event.preventDefault();
  };

  return (
    <Block>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <JoinListArea>
          {data.result.map((party) => {
            return (
              <ChatItemArea
                data-index={party.partyTitle}
                key={party.partyID}
                onClick={changeRoom}
              >
                <ChatItemInner>
                  <h4 style={{ marginBottom: '0.5rem' }}>{party.partyTitle}</h4>
                  <BookArea>
                    <BookImage src={party.bookThumbnail}></BookImage>
                    <BookInfoArea>
                      <BookTitle>{party.bookTitle}</BookTitle>
                      <BookWriter>{party.authors}</BookWriter>
                    </BookInfoArea>
                  </BookArea>
                </ChatItemInner>
                <Line />
              </ChatItemArea>
            );
          })}
        </JoinListArea>
      )}
      <ChatRoomArea>
        <ChatNavArea>
          <LeftArrow
            className={className}
            size="1rem"
            cursor={className === 'deactive' ? 'default' : 'pointer'}
            onClick={className === 'deactive' ? null : null}
          />
          <h4>{title}</h4>
          <BiMenu size="1.5rem" color="white" cursor="pointer" />
        </ChatNavArea>
        <MessageArea></MessageArea>
        <SendArea>
          <form onSubmit={sub}>
            <MessageInput placeholder="메세지를 입력해주세요" />
          </form>
          <BiSend size="1.5rem" color="white" cursor="pointer" />
        </SendArea>
      </ChatRoomArea>
    </Block>
  );
};

export default ChatLayout;
