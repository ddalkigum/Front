import React from 'react';
import styled from 'styled-components';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import RoundButton from '../../component/common/RoundButton';
import RoundImage from '../../component/common/RoundImage';
import RelationGroup from '../../component/realtion/RelationGroup';
import { getKorAvailableDay } from '../../lib/date';
import { getPartyDetail } from '../../lib/api/party';
import { theme } from '../../style/theme';
import { AvailableDay, Book, Party, User } from '../../types/entity';
import { mediaQuery } from '../../lib/style/media';
import PartyCard from '../../component/party/PartyCard';

const { useState, useEffect, Fragment, createElement } = React;

const Block = styled.div`
  height: 100%;
  width: 776px;
  margin: auto;

  ${mediaQuery(776)} {
    width: 100%;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaQuery(776)} {
    margin: 0 1.5rem;
  }
`;

const Title = styled.div`
  margin-top: 3rem;
`;

const SubTitle = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const DetailConditionArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  h4 {
    margin-right: 0.625rem;
  }
`;

const OwnerProfileArea = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  cursor: pointer;

  img {
    margin-right: 1rem;
  }
`;

const ConditionArea = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 2rem 1rem;
  border-bottom: 0.5rem solid ${theme.line};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const BookInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  img {
    width: 6rem;
    height: 8rem;
    margin-bottom: 0.5rem;
  }

  div {
    display: flex;
    flex-direction: column;
    line-height: 1.25rem;
  }
`;

const DescriptionArea = styled.div`
  margin: 5rem 0;
`;

const ApplyButtonArea = styled.div`
  margin: 2rem auto;
`;

export interface PartyParticipant {
  isParticipant: boolean;
  count: number;
}

export interface PartyDetailResult {
  owner: Pick<User, 'id' | 'nickname' | 'profileImage'>;
  party: Omit<Party, 'bookID' | 'ownerID'>;
  book: Book;
  participant: PartyParticipant;
  availableDay: AvailableDay[];
}

const DetailPageLayout = ({ nickname, title }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [relationIsLoading, setRelationIsLoading] = useState(false);
  const [data, setData] = useState<PartyDetailResult>();
  const [content, setContent] = useState<any>(Fragment);

  useEffect(() => {
    getPartyDetail(nickname, title).then(({ result }) => {
      console.log(result);
      setData(result);
      setIsLoading(true);
      convertStringToHtml(result.party.description);
    });

    // TODO: relation group get api client
    // relation group set = true
  }, []);

  const convertStringToHtml = (htmlString: string) => {
    unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeReact, { createElement, Fragment })
      .process(htmlString)
      .then((file) => {
        setContent(file.result);
      });
  };

  return (
    <>
      <Block>
        {isLoading ? (
          <Inner>
            <Title>
              <h1>{data.party.title}</h1>
            </Title>
            <OwnerProfileArea>
              <RoundImage size="SMALL" src={data.owner.profileImage} />
              <h4>{data.owner.nickname}</h4>
            </OwnerProfileArea>
            <ConditionArea>
              <DetailConditionArea>
                <h4>모임여부:</h4>

                <h5>{data.party.isOnline ? '온라인' : '오프라인'}</h5>
              </DetailConditionArea>

              {data.party.isOnline ? null : (
                <DetailConditionArea>
                  <h4>모임위치:</h4>
                  <h5>{`${data.party.region} ${data.party.city} ${data.party.town}`}</h5>
                </DetailConditionArea>
              )}
              <DetailConditionArea>
                <h4>모집인원:</h4>
                <h5>{data.party.numberOfRecruit} 명</h5>
              </DetailConditionArea>
              <DetailConditionArea>
                <h4>가능요일:</h4>
                <h5>
                  {getKorAvailableDay(
                    data.availableDay.map((day) => day.dayID)
                  )}
                </h5>
              </DetailConditionArea>
              <BookInfoArea>
                <img src={data.book.thumbnail} />
                <div>
                  <h5>{data.book.title}</h5>
                  <h6>{data.book.authors}</h6>
                </div>
              </BookInfoArea>
            </ConditionArea>
            <DescriptionArea>{content}</DescriptionArea>
            <ApplyButtonArea>
              <RoundButton size="LARGE" color="blue" text="신청하기" />
            </ApplyButtonArea>
            <SubTitle>
              <h3>비슷한 그룹</h3>
            </SubTitle>
            {/* {relationPartyList.map(party => {
              
            <PartyCard party={party}/>
            })} */}
          </Inner>
        ) : null}
      </Block>
    </>
  );
};

export default DetailPageLayout;
