import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { theme } from '../../style/theme';

const { useState, useRef } = React;

const Block = styled.div`
  padding: 1rem 0 2rem 0;
  display: flex;
`;

const BaseInput = styled.input`
  background: inherit;
  width: 50%;
  font-size: 1rem;
  padding-left: 0.375rem;
  margin-left: 1rem;
  border-bottom: 1px solid ${theme.boldLine};

  :hover {
    outline: none;
  }

  :focus {
    outline: none;
  }
`;

const HomeSearch = () => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const searchBarRef = useRef<any>();

  const openSearchBar = () => {
    setSearchBarOpen(true);
  };

  return (
    <Block>
      <div onClick={openSearchBar}>
        <BiSearch size="2rem" cursor="pointer" />
      </div>
      {searchBarOpen ? (
        <BaseInput ref={searchBarRef} placeholder="검색어를 입력해주세요" />
      ) : null}
    </Block>
  );
};

export default HomeSearch;
