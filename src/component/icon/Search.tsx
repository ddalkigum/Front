import React from 'react';
import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';

const CustomSearchIcon = styled(BiSearch)`
  path {
    fill: ${(props) => props.theme.text};
  }
`;

const Search = ({ size, onClick, cursor = 'pointer' }) => {
  return (
    <CustomSearchIcon
      size={size}
      cursor={cursor}
      onClick={onClick}
    ></CustomSearchIcon>
  );
};

export default Search;
