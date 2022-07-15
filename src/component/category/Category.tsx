import React from 'react';
import styled from 'styled-components';

const { useState } = React;

const Block = styled.div`
  background: ${(props) => props.theme.boldLine};
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  margin: 0 0.5rem;
  color: ${(props) => props.theme.text};
`;

const ItemArea = styled.div<{ active: boolean }>`
  padding-bottom: 1rem;
  text-align: center;
  cursor: pointer;
  width: 100%;
  border-bottom: ${(props) =>
    props.active ? `3px solid ${props.theme.line}` : null};

  font-family: ${(props) => (props.active ? 'GmarketMedium' : 'GmarketLight')};
`;

const categoryList = [
  { key: '1', name: '모집', active: true },
  { key: '2', name: '책', active: false },
  { key: '3', name: '그룹 후기', active: false },
];

const Category = () => {
  const [activeCategory, setActivCategory] = useState(categoryList);

  const changeActiveCategory = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const selectedCategoryName = event.currentTarget.innerText;
    const updatedCategoryList = categoryList.map((category) => {
      if (category.name === selectedCategoryName) {
        category.active = true;
      } else {
        category.active = false;
      }
      return category;
    });
    setActivCategory(updatedCategoryList);
  };

  return (
    <Block>
      {categoryList.map((category) => {
        return (
          <ItemArea
            key={category.key}
            active={category.active}
            onClick={changeActiveCategory}
          >
            <h4>{category.name}</h4>
          </ItemArea>
        );
      })}
    </Block>
  );
};

export default Category;
