import React from 'react';
import styled from 'styled-components';
import RoundButton from '../../component/common/RoundButton';
import RoundImage from '../../component/common/RoundImage';
import RelationGroup from '../../component/realtion/RelationGroup';
import { theme } from '../../style/theme';

const Block = styled.div`
  height: 100%;
  width: 775px;
  margin: auto;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin: 3rem 0 0 0;
`;

const SubTitle = styled.div`
  margin: 2rem 0;
`;

const OwnerProfileArea = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;

  img {
    margin-right: 1rem;
  }
`;

const ConditionArea = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 2rem 1rem;
  border-bottom: 0.5rem solid ${theme.line};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  h4 {
    margin-bottom: 2rem;
  }
`;

const BookInfoArea = styled.div`
  display: flex;
  img {
    width: 4rem;
    height: 6rem;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;

const DescriptionArea = styled.div`
  height: 400px;
  background: ${theme.line};
  margin-top: 2rem;
`;

const ApplyButtonArea = styled.div`
  margin: 2rem auto;
`;

const DetailPageLayout = () => {
  return (
    <>
      <Block>
        <Inner>
          <Title>
            <h1>제목입니다</h1>
          </Title>
          <OwnerProfileArea>
            <RoundImage
              size="SMALL"
              src="https://cdn.debook.me/image/party/%EB%94%B8%EA%B8%B0%EA%B2%80/52be9e12-2623-4475-ada6-75c37e8e8ed1"
            />
            <h4>딸기검</h4>
          </OwnerProfileArea>
          <ConditionArea>
            <h4>온오프라인 여부 &gt; 버튼으로? </h4>
            <h4>모집인원: _ 명</h4>
            <h4>가능요일: 월 / 화</h4>
            <BookInfoArea>
              <img src="http://image.yes24.com/goods/92742567/XL" />
              <div>
                <h5>이것이 MySQL이다! 마</h5>
                <h6>김준형</h6>
              </div>
            </BookInfoArea>
          </ConditionArea>
          <DescriptionArea></DescriptionArea>
          <ApplyButtonArea>
            <RoundButton size="LARGE" color="blue" text="신청하기" />
          </ApplyButtonArea>
          <SubTitle>
            <h3>비슷한 그룹</h3>
          </SubTitle>
          <RelationGroup />
        </Inner>
      </Block>
    </>
  );
};

export default DetailPageLayout;
