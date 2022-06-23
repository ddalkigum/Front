import React from 'react';
import styled from 'styled-components';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router';
import RoundButton from '../../component/common/RoundButton';
import RoundImage from '../../component/common/RoundImage';
import { getKorAvailableDay } from '../../lib/date';
import {
  cancelJoinResponse,
  getPartyDetail,
  registNotification,
  requestParticipateResponse,
} from '../../lib/api/party';
import { theme } from '../../style/theme';
import { AvailableDay, Book, Party, User } from '../../types/entity';
import { mediaQuery } from '../../lib/style/media';
import { authModalOpen, currentUser, messageHandler } from '../../atom';
import { handleAPI } from '../../lib/api/common';

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
  width: fit-content;
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
  isOwner: boolean;
  isParticipant: boolean;
  count: number;
}

export interface PartyDetailResult {
  owner: Pick<User, 'id' | 'nickname' | 'profileImage'>;
  party: Omit<Party, 'partyID' | 'ownerID'>;
  book: Book;
  participant: PartyParticipant;
  availableDay: AvailableDay[];
}

const DetailPageLayout = ({ nickname, slug }) => {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [relationIsLoading, setRelationIsLoading] = useState(false);
  const [isOpen, setOpen] = useRecoilState(authModalOpen);
  const [data, setData] = useState<PartyDetailResult>();
  const [content, setContent] = useState<any>(Fragment);
  const user = useRecoilValue(currentUser);
  const setUser = useSetRecoilState(currentUser);
  const setMessage = useSetRecoilState(messageHandler);

  useEffect(() => {
    getPartyDetail(nickname, slug).then(({ result }) => {
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

  const joinParty = async () => {
    if (!user) {
      return setOpen(true);
    }

    const response = await handleAPI(
      requestParticipateResponse(data.party.id, user.id)
    );

    if (response.result === 'EndOfRecruit') {
      setMessage({
        name: 'EndOfRecruit',
        message: '모집이 종료되었습니다',
        status: 'error',
      });
      setTimeout(() => setMessage(null), 1500);
      return;
    }

    if (response.status === 'Error') {
      if (response.result.message === 'AlreadyRequestParticpate') {
        // 이미 참가 신청한 그룹입니다
        setMessage({
          message: '이미 가입신청한 그룹입니다',
          name: response.result.name,
          status: 'error',
        });
        setTimeout(() => setMessage(null), 1500);
        return;
      }

      if (response.result.message === 'NotFound') {
        setMessage({
          name: 'NotFound',
          message: '존재하지 않는 그룹입니다, 홈페이지로 돌아갑니다',
          status: 'error',
        });
        setTimeout(() => setMessage(null), 1500);
        return;
      }
      return;
    }

    await registNotification(data.party.id);

    setMessage({
      name: 'JoinSuccess',
      message:
        '참가완료 되었습니다\r\n오픈챗방은 우측 상단 알림페이지에서 확인 가능합니다',
      status: 'success',
    });

    setTimeout(() => setMessage(null), 1500);
  };

  const cancelJoin = async () => {
    await cancelJoinResponse(data.party.id);

    setMessage({
      name: 'CancelJoin',
      message: '취소 완료됬습니다',
      status: 'success',
    });
    setTimeout(() => setMessage(null), 1500);
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
              {data.participant.isParticipant ? (
                data.participant.isOwner ? (
                  <RoundButton
                    size="LARGE"
                    color="gray"
                    text="이미 참여한 그룹입니다"
                    cursor="default"
                  />
                ) : (
                  <RoundButton
                    size="LARGE"
                    color="pink"
                    text="참여 취소"
                    onClick={cancelJoin}
                  />
                )
              ) : (
                <RoundButton
                  size="LARGE"
                  color="blue"
                  text="참가하기"
                  onClick={joinParty}
                />
              )}
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
