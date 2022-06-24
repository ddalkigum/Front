import { AxiosError } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Skeleton from '../../component/common/Skeleton';
import PartyCard from '../../component/party/PartyCard';
import SkeletonCard from '../../component/party/SkeletonCard';
import { getPartyList } from '../../lib/api/party';

const { useState, useEffect } = React;

const Block = styled.div`
  height: 100%;
  width: 100%;
`;

const Inner = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
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

const HomeLayout = () => {
  const [partyList, setPartyList] = useState<MainCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const navigation = useNavigate();

  useEffect(() => {
    getPartyList(page)
      .then(({ result }) => {
        setPartyList(result);
        setIsLoading(false);
      })
      .catch((error: AxiosError) => {
        if (error.status === '500') {
          alert('문제');
        }
      });
  }, []);

  return (
    <Block>
      <Inner>
        {isLoading
          ? Array.from({ length: 12 }).map((value, index) => {
              return <SkeletonCard key={index} />;
            })
          : partyList.map((party) => {
              return <PartyCard key={party.partyID} party={party}></PartyCard>;
            })}
      </Inner>
    </Block>
  );
};

export default HomeLayout;
