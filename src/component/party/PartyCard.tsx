import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import Line from '../common/Line';
import ParticipantInfo from '../common/ParticipantInfo';
import Tag from '../common/Tag';
import RoundUserImage from '../common/RoundImage';

const Block = styled.div`
  width: 24rem;
  height: 100%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 9rem;
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

const BookImage = styled.img`
  width: 3rem;
  height: 4rem;
`;

const BookInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.875rem;
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

const Date = styled.h5`
  color: ${theme.subText};
`;

const UserInfoArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 1rem;
`;

const AdminInfoArea = styled.div`
  display: flex;
  align-items: center;
`;

const AdminNickname = styled.h5`
  font-family: GMarketBold;
  margin-left: 0.5rem;
`;
interface IBook {
  title: string;
  imageURL: string;
  writer: string;
}

interface IParticipant {
  max: number;
  current: number;
}

interface IParty {
  imageURL: string;
  title: string;
  isOnline: boolean;
  createdAt: string;
}

interface IAdmin {
  imageURL: string;
  nickname: string;
}

interface IMainCard {
  party: IParty;
  book: IBook;
  admin: IAdmin;
  participant: IParticipant;
}

const PartyCard = () => {
  return (
    <Block>
      <Image
        src={
          'https://image.kmib.co.kr/online_image/2021/0903/2021090220380531799_1630582685_0924207731.jpg'
        }
      />
      <InfoArea>
        <TitleArea>
          <h3>제목입니다</h3>
        </TitleArea>
        <BookArea>
          <BookImage
            src={'http://image.yes24.com/goods/90118480/XL'}
          ></BookImage>
          <BookInfoArea>
            <h5>이것이 MySQL이다</h5>
            <BookWriter>우재남</BookWriter>
          </BookInfoArea>
        </BookArea>
        <SubInfoArea>
          <Date>2021년 04월 29일</Date>
          <Tag text={'온라인'}></Tag>
        </SubInfoArea>
      </InfoArea>
      <Line />
      <UserInfoArea>
        <AdminInfoArea>
          <RoundUserImage
            size={'SMALL'}
            src={'http://image.yes24.com/goods/90118480/XL'}
          ></RoundUserImage>
          <AdminNickname>nickname</AdminNickname>
        </AdminInfoArea>
        <ParticipantInfo max={4} current={2}></ParticipantInfo>
      </UserInfoArea>
    </Block>
  );
};

export default PartyCard;
