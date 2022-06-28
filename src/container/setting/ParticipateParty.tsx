import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import PartyCard from '../../component/card/PartyCard';
import SkeletonCard from '../../component/card/SkeletonCard';
import { handleAPI } from '../../lib/api/common';
import { getParticipatePartyList } from '../../lib/api/party';

const { useState } = React;

const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const ParticipateParty = ({ user, subjectIndex }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(
    [user.nickname, 'participate', page],
    () => handleAPI(getParticipatePartyList(user.id))
  );
  return (
    <Block>
      {isLoading
        ? Array.from({ length: 8 }).map((value, index) => {
            return <SkeletonCard key={index} />;
          })
        : subjectIndex === '0'
        ? data.result
            .filter((party) => party.isOwner)
            .map((party) => {
              return <PartyCard key={party.partyID} party={party} />;
            })
        : data.result
            .filter((party) => !party.isOwner)
            .map((party) => {
              return <PartyCard key={party.partyID} party={party} />;
            })}
    </Block>
  );
};

export default ParticipateParty;
