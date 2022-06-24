import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import PartyCard from '../../component/party/PartyCard';
import { getParticipatePartyList } from '../../lib/api/party';
import SkeletonCard from '../../component/party/SkeletonCard';

const Participate = ({
  userID,
  userNikcname,
  index,
}: {
  userID: number;
  userNikcname: string;
  index: '0' | '1';
}) => {
  const { data, isLoading } = useQuery([userNikcname, 'participate'], () =>
    getParticipatePartyList(userID)
  );

  return (
    <>
      {isLoading
        ? Array.from({ length: 8 }).map((value, index) => {
            return <SkeletonCard key={index} />;
          })
        : index === '0'
        ? data.result
            .filter((party) => party.isOwner)
            .map((party) => {
              return <PartyCard key={party.partyID} party={party}></PartyCard>;
            })
        : data.result
            .filter((party) => !party.isOwner)
            .map((party) => {
              return <PartyCard key={party.partyID} party={party}></PartyCard>;
            })}
    </>
  );
};

export default Participate;
