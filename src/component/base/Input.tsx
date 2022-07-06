import styled from 'styled-components';
import { theme } from '../../style/theme';

export const BaseInput = styled.input`
  background: inherit;
  font-size: 1rem;
  padding-top: 0.2rem;
  border-bottom: 1px solid ${theme.boldLine};
  :hover {
    outline: none;
  }

  :focus {
    outline: none;
  }
`;
