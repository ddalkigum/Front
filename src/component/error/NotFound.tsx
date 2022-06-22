import React from 'react';
import styled from 'styled-components';

const Block = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  text-align: center;
  align-items: center;
`;

const Inner = styled.div`
  width: 100%;
  height: auto;
`;

const NotFound = () => {
  return (
    <Block>
      <Inner>
        <h2>페이지를 찾을 수 없습니다</h2>
      </Inner>
    </Block>
  );
};

export default NotFound;
