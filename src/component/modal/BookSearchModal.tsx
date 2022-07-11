import React from 'react';
import { BiChevronLeft, BiChevronRight, BiSearch } from 'react-icons/bi';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import CloseIcon from '../icon/Close';
import { getBookList, BookList } from '../../lib/api/party';

const { useState, createRef } = React;
const LIMIT_PAGE = 50;
const DEFAULT_PAGE = 1;
const BOOK_PER_PAGE = 10;
const NUMBER_PER_PAGE = 5;

const indexToPageNumber = {
  1: 0,
  2: 5,
  3: 10,
  4: 15,
  5: 20,
  6: 25,
};

const ModalBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1;
  background: rgba(0, 0, 0, 0.6);
`;

const Modal = styled.div`
  width: 540px;
  height: 500px;
  margin: auto;
  background: white;
  z-index: 3;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`;

const CloseArea = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2rem 0.3rem;
`;

const SearchArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 90%;
  background: inherit;
  padding-bottom: 0.25rem;
  font-size: 1rem;
  border-bottom: 2px solid ${theme.boldLine};
  :hover {
    outline: none;
  }

  :focus {
    outline: none;
  }
`;

const ResultArea = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  margin-top: 1rem;
  height: 65%;
  border: 1px solid ${theme.line};
`;

const ItemArea = styled.li`
  display: flex;
  cursor: pointer;
  padding: 0.5rem 0;

  :hover {
    background: ${theme.malibu};
  }

  img {
    width: 2rem;
    height: 3rem;
    margin-right: 0.5rem;
  }

  div {
    display: flex;
    flex-direction: column;
    line-height: 1.2rem;
  }
`;

const PaginationArea = styled.div`
  width: 100%;
  padding: 1rem 0;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

const ClickedPageNumber = styled.li`
  font-family: GmarketBold;
  font-size: 1.125rem;
  cursor: default;
`;

const EnabledList = styled.li`
  cursor: default;
  color: ${(props) => props.theme.line};
`;

const AbledList = styled.li`
  cursor: pointer;
`;

const ResultMessageArea = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BookSearchModal = ({ isOpen, setOpen, setBook }) => {
  const bookRef = createRef<HTMLInputElement>();
  const [bookTitleForSearch, setBookTitleForSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [currentBookList, setCurrentBookList] = useState<BookList>();
  const [resultMessage, setResultMessage] = useState('');
  const [pageList, setPageList] = useState<number[]>([]);

  const closeModal = () => {
    document.body.style.overflowY = null;
    setOpen(!isOpen);
  };

  const getSelectedBook = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const index = event.currentTarget.getAttribute('data-index');
    const foundBook = currentBookList.find((item) => item.id === index);
    setBook(foundBook);
    setOpen(!isOpen);
    document.body.style.overflowY = null;
  };

  const searchBook = async (event) => {
    const title = bookRef.current.value;

    // validate title
    if (title.length < 2) {
      setResultMessage('2글자 이상 입력해주세요');
    }
    const response = await getBookList(title, currentPageIndex);

    if (response && !response.result.bookList.length) {
      setResultMessage('결과가 없어요');
    }

    const foundBookList = response.result.bookList;
    const foundLastPage = response.result.meta.lastPage;
    const lastPage = foundLastPage >= 50 ? LIMIT_PAGE : foundLastPage;

    const pageNumberList = Array.from(
      { length: lastPage },
      (_, index) => index + 1
    );

    setBookTitleForSearch(title);
    setPageList(pageNumberList);
    setCurrentBookList(foundBookList);
  };

  const clickPage = async (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const page = Number(event.currentTarget.innerText);
    setCurrentPage(page);
  };

  const getStartItem = () => {
    const index = (Math.ceil(currentPage % 5.1) - 1) * BOOK_PER_PAGE;
    return index;
  };

  const getLastItem = () => {
    const index = Math.ceil(currentPage % 5.1) * BOOK_PER_PAGE;
    return index;
  };

  const getNextPage = async () => {
    const nextPageIndex = currentPageIndex + 1;
    const response = await getBookList(bookTitleForSearch, nextPageIndex);
    const { bookList } = response.result;

    const count = Math.ceil(currentPage / NUMBER_PER_PAGE);
    const nextPageStartNumber = NUMBER_PER_PAGE * count + 1;

    setCurrentPage(nextPageStartNumber);
    setCurrentBookList(bookList);
    setCurrentPageIndex(nextPageIndex);
  };

  const getPrevPage = async () => {
    const prevPageIndex = currentPageIndex - 1;
    const response = await getBookList(bookTitleForSearch, prevPageIndex);
    const { bookList } = response.result;
    const count = Math.ceil(currentPage / NUMBER_PER_PAGE);
    const prevPageStartNumber =
      NUMBER_PER_PAGE * (count - 1) - NUMBER_PER_PAGE + 1;

    setCurrentPage(prevPageStartNumber);
    setCurrentPageIndex(prevPageIndex);
    setCurrentBookList(bookList);
  };

  return (
    <ModalBlock>
      <Modal>
        <CloseArea>
          <CloseIcon
            color="gray"
            onClick={closeModal}
            width="1rem"
            height="1rem"
          ></CloseIcon>
        </CloseArea>
        <SearchArea>
          <SearchInput placeholder="도서를 입력해주세요" ref={bookRef} />
          <BiSearch size="1.5rem" cursor="pointer" onClick={searchBook} />
        </SearchArea>
        <ResultArea>
          {currentBookList && currentBookList.length ? (
            currentBookList.slice(getStartItem(), getLastItem()).map((book) => {
              return (
                <ItemArea
                  onClick={getSelectedBook}
                  key={book.id}
                  data-index={book.id}
                >
                  <img src={book.thumbnail} />
                  <div>
                    <h4>{book.title}</h4>
                    <h5>
                      {book.authors.map((author, index) => {
                        const seperator =
                          index === book.authors.length - 1 ? ' ' : ', ';
                        return author + seperator;
                      })}
                    </h5>
                  </div>
                </ItemArea>
              );
            })
          ) : (
            <ResultMessageArea>
              {/* <div style={{ width: '5rem', height: '5rem', background: 'red' }}>
                그림 영역{' '}
              </div> */}
              <h4>{resultMessage}</h4>
            </ResultMessageArea>
          )}
        </ResultArea>
        {currentBookList && currentBookList.length ? (
          <PaginationArea>
            <ul>
              {currentPageIndex === 1 ? (
                <EnabledList>
                  <BiChevronLeft size="1.5rem" />
                </EnabledList>
              ) : (
                <AbledList onClick={getPrevPage}>
                  <BiChevronLeft size="1.5rem" />
                </AbledList>
              )}
              {pageList
                .slice(
                  indexToPageNumber[currentPageIndex],
                  indexToPageNumber[currentPageIndex] + 5
                )
                .map((page) => {
                  if (currentPage === page) {
                    return (
                      <ClickedPageNumber key={page}>{page}</ClickedPageNumber>
                    );
                  }
                  return (
                    <AbledList key={page} onClick={clickPage}>
                      {page}
                    </AbledList>
                  );
                })}

              {currentPageIndex ===
              Math.ceil(pageList.length / BOOK_PER_PAGE) ? (
                <EnabledList>
                  <BiChevronRight size="1.5rem" />
                </EnabledList>
              ) : (
                <AbledList>
                  <BiChevronRight size="1.5rem" onClick={getNextPage} />
                </AbledList>
              )}
            </ul>
          </PaginationArea>
        ) : null}
      </Modal>
    </ModalBlock>
  );
};

export default BookSearchModal;
