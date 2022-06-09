import React from 'react';
import styled from 'styled-components';
import PartyCard from '../../component/party/PartyCard';

const arr = new Array(10).fill(0);

const HomeLayout = () => {
  let i = '1';
  return (
    <>
      <Block>
        <Inner>
          {arr.map((element) => {
            i += '1';
            return <PartyCard key={i}></PartyCard>;
          })}
        </Inner>
      </Block>
    </>
  );
};

const Block = styled.div`
  height: 100%;
  margin: auto;
  padding: 20px;
`;

const Inner = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

export default HomeLayout;
