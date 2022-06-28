import React from 'react';
import styled from 'styled-components';
import { User } from '../../types/entity';
import RoundImage from '../../component/common/RoundImage';

const Block = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5rem;

  img {
    margin-right: 2rem;
  }
`;

const ProfileLayout = ({ user }: { user: User }) => {
  return (
    <Block>
      <RoundImage src={user.profileImage} size="XLARGE"></RoundImage>
      <h2>{user.nickname}</h2>
    </Block>
  );
};
export default ProfileLayout;
