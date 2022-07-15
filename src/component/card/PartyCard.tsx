import React from 'react';
import styled from 'styled-components';
import Line from '../common/Line';
import ParticipantInfo from '../common/ParticipantInfo';
import Tag from '../common/Tag';
import RoundUserImage from '../common/RoundImage';
import { MainCard } from '../../container/home/HomeLayout';
import { convertDateToString } from '../../lib/date';
import { mediaQuery } from '../../lib/style/media';

const Block = styled.article`
  width: calc(24% - 1rem);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background: ${(props) => props.theme.cardBackground};
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
`;

const InfoArea = styled.div`
  padding: 0.875rem 0.875rem 0rem;
`;

const TitleArea = styled.div`
  padding-bottom: 0.875rem;

  h3 {
    font-family: 'GmarketMedium';
  }
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

const SubInfoArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0rem;
`;

const AddressArea = styled.div`
  padding-top: 1rem;
`;

const Date = styled.div`
  color: ${(props) => props.theme.subText};
  font-size: 0.75rem;
`;

const UserInfoArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const AdminInfoArea = styled.a`
  display: flex;
  align-items: center;
`;

const AdminNickname = styled.h5`
  margin-left: 0.5rem;
`;

const PartyCard = ({ party }: { party: MainCard }) => {
  return (
    <Block>
      <InfoArea>
        <a href={`/@${party.nickname}/${party.slug}`}>
          <TitleArea>
            <h3>{party.partyTitle}</h3>
          </TitleArea>
          <BookArea>
            <BookImage src={party.bookThumbnail}></BookImage>
            <BookInfoArea>
              <BookTitle>{party.bookTitle}</BookTitle>
              <BookWriter>{party.authors}</BookWriter>
            </BookInfoArea>
          </BookArea>
        </a>
        <AddressArea>
          {party.isOnline ? (
            <h5>&nbsp;</h5>
          ) : (
            <h5>{`${party.region} ${party.city} ${party.town}`}</h5>
          )}
        </AddressArea>
        <SubInfoArea>
          <Date>{convertDateToString(party.createdAt)}</Date>
          <Tag text={party.isOnline ? '온라인' : '오프라인'}></Tag>
        </SubInfoArea>
      </InfoArea>
      <Line />
      <UserInfoArea>
        <AdminInfoArea href={`/profile/@${party.nickname}`}>
          <RoundUserImage
            size={'SMALL'}
            src={party.profileImage}
          ></RoundUserImage>
          <AdminNickname>{party.nickname}</AdminNickname>
        </AdminInfoArea>
        <ParticipantInfo
          max={party.numberOfRecruit}
          current={party.numberOfParticipant}
        ></ParticipantInfo>
      </UserInfoArea>
    </Block>
  );
};

export default PartyCard;
