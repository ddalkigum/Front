import React from 'react';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import PartyCard from '../../component/card/PartyCard';
import SkeletonCard from '../../component/card/SkeletonCard';
import { getPartyList } from '../../lib/api/party';
import { getScrollBottom } from '../../lib/util';
import { theme } from '../../style/theme';
import { messageHandler } from '../../atom';
import { handleAPI } from '../../lib/api/common';

const { useState, useEffect, useRef, useCallback } = React;

const Block = styled.div`
  width: 100%;
  overflow: scroll;
`;

const Inner = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 0.2rem 0.5rem 0 0.5rem;
  padding-bottom: 1.5rem;
`;

const fadeBottom = keyframes`
  0% {
    transform: translateY(5rem);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const PaginationArea = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: ${theme.homeBackground};
  width: 100%;
  height: 5rem;
  bottom: 0;
  left: 0;
  border-top: 1px solid ${theme.line};

  animation: ${fadeBottom} 0.3s ease-in;
`;

export interface MainCard {
  partyID: string;
  partyTitle: string;
  numberOfRecruit: number;
  slug: string;
  isOnline: boolean;
  region?: string;
  city?: string;
  town?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  ownerID: number;
  nickname: string;
  profileImage: string;
  bookID: string;
  bookTitle: string;
  bookThumbnail: string;
  authors: string;
  numberOfParticipant: string;
  isOwner?: boolean;
}

const ITEM_COUNT = 24;

const HomeLayout = () => {
  const [partyList, setPartyList] = useState<MainCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [showPagination, setShowPagination] = useState(true);
  const innerRef = useRef<HTMLDivElement>();
  const setMessage = useSetRecoilState(messageHandler);
  const navigation = useNavigate();

  const onScroll = useCallback(() => {
    const scrollBottom = getScrollBottom();
    if (scrollBottom > 200) {
      setShowPagination(false);
    }
    if (scrollBottom < 200) {
      setShowPagination(true);
    }
  }, [showPagination]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    handleAPI(getPartyList(page)).then(({ result, status }) => {
      if (status === 'Error') {
        setMessage({
          name: 'Error',
          message: '문제가 발생했습니다',
          status: 'error',
        });
        return;
      }

      if (result.length < ITEM_COUNT) {
        setShowPagination(true);
        setIsLastPage(true);
      }

      setPartyList(result);
      setIsLoading(false);
    });
  }, [page]);

  const loadNextPage = async () => {
    setPage(page + 1);
    window.scrollTo(0, 0);
  };

  const loadPrevPage = async () => {
    setIsLastPage(false);
    setPage(page - 1);
    window.scrollTo(0, 0);
  };

  const submitWord = (event) => {
    event.preventDefault();
  };
  return (
    <Block>
      <Inner ref={innerRef}>
        {isLoading
          ? Array.from({ length: 12 }).map((value, index) => {
              return <SkeletonCard key={index} />;
            })
          : partyList.map((party) => {
              return <PartyCard key={party.partyID} party={party}></PartyCard>;
            })}
      </Inner>
      {showPagination ? (
        <PaginationArea>
          {page === 1 ? (
            <BsChevronLeft
              cursor="default"
              size="1.5rem"
              color={theme.boldLine}
            />
          ) : (
            <BsChevronLeft
              cursor="pointer"
              size="1.5rem"
              onClick={loadPrevPage}
            />
          )}
          {isLastPage ? (
            <BsChevronRight
              cursor="default"
              color={theme.boldLine}
              size="1.5rem"
            />
          ) : (
            <BsChevronRight
              cursor="pointer"
              size="1.5rem"
              onClick={loadNextPage}
            />
          )}
        </PaginationArea>
      ) : null}
    </Block>
  );
};

export default HomeLayout;
