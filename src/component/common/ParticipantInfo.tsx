import React from 'react';
import styled from 'styled-components';
import UserImage from '../icon/User';

const Block = styled.div`
  display: flex;
  width: 3.25rem;
  align-items: center;
  justify-content: space-between;
`;

const Count = styled.h6``;

const ParticipantInfo = ({ max, current }) => {
  return (
    <Block>
      <UserImage color={'gray'}></UserImage>
      <Count>
        {current} / {max}
      </Count>
    </Block>
  );
};

export default ParticipantInfo;
