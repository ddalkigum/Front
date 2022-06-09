import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';

const TagBox = styled.div`
  height: 1.5rem;
  padding: 0rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  background-color: ${theme.azureRadiance};
  color: ${theme.buttonText};
`;

const Tag = ({ text }) => {
  return (
    <TagBox>
      <h5>{text}</h5>
    </TagBox>
  );
};

export default Tag;
