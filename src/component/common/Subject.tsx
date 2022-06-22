import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../style/theme';

const SubjectArea = styled.div`
  margin-top: 5rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: flex-start;
`;

const SubjectList = styled.h3<{ isActive }>`
  padding: 1.5rem 2rem;
  cursor: pointer;

  ${(props) =>
    props.isActive
      ? css`
          border-bottom: 3px solid ${theme.boldLine};
        `
      : css``}
`;

const Subject = ({ subjectList, activeSubjectID, setActiveSubjectID }) => {
  const setSubjectActive = (
    event: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    const subjectIndex = event.currentTarget.getAttribute('data-index');
    const foundSubject = subjectList.find(
      (subject) => subject.id === subjectIndex
    );
    setActiveSubjectID(foundSubject.id);
  };

  return (
    <SubjectArea>
      {subjectList.map((subject) => {
        const active = subject.id === activeSubjectID ? true : false;
        return (
          <SubjectList
            key={subject.id}
            data-index={subject.id}
            isActive={active}
            onClick={setSubjectActive}
          >
            {subject.name}
          </SubjectList>
        );
      })}
    </SubjectArea>
  );
};

export default Subject;
