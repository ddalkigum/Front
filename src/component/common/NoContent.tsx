import React from 'react';
import styled from 'styled-components';

const Block = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 4rem;
    height: 4rem;
    margin-bottom: 2rem;
  }
`;

const NoContent = ({ message }) => {
  return (
    <Block>
      <h3>{message}</h3>
    </Block>
  );
};

export default NoContent;
