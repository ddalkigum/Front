import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { BiSearch } from 'react-icons/bi';
import MainTemplate from '../component/main/MainTemplate';
import RoundButton, { Color } from '../component/common/RoundButton';
import { theme } from '../style/theme';
import BookSearchModal from '../component/search/BookSearchModal';
import AddressModal from '../component/search/AddressModal';
import { BookInfo, registParty, InsertParty } from '../lib/api/party';
import { dayObject } from '../lib/date';
import { messageHandler } from '../atom';

const { useState, useMemo, useRef, createRef, useReducer } = React;

const Block = styled.div`
  width: 775px;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const TitleArea = styled.div`
  width: 100%;
  padding: 2rem 0;
  input {
    width: 100%;
    padding: 0.5rem 0;
    background: inherit;
    font-size: 1.875rem;
    border-bottom: 2px solid ${theme.boldLine};
    :hover {
      outline: none;
    }

    :focus {
      outline: none;
    }
  }
`;

const RecruitPlanArea = styled.div`
  display: flex;
  padding: 0 0 1rem 0;
  align-items: center;

  h4 {
    margin-right: 1.5rem;
  }

  h5 {
    color: ${theme.subText};
  }

  button {
    margin-right: 0.5rem;
  }
`;

const BaseInput = styled.input`
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

const RecruitPlanInput = styled(BaseInput)`
  width: 2rem;
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

const KakaoChatInput = styled(BaseInput)`
  width: 25rem;
`;

const KakaoPasswordInput = styled(BaseInput)`
  width: 8rem;
`;

const WriteArea = styled(ReactQuill)`
  height: 480px;
  margin-bottom: 2rem;
`;

const ButtonArea = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
`;

const SearchResultArea = styled.div`
  display: flex;
  margin-bottom: 1rem;

  img {
    width: 4rem;
    height: 6rem;
    margin-right: 1.5rem;
  }

  h4 {
    color: gray;
  }
`;

const BookInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5rem;
`;

const AddressInput = styled(BaseInput)`
  width: 12rem;
`;

interface AvailableDay {
  available: boolean;
  color: Color;
}

interface IAvailableDay {
  mon: AvailableDay;
  tue: AvailableDay;
  wed: AvailableDay;
  thu: AvailableDay;
  fri: AvailableDay;
  sat: AvailableDay;
  sun: AvailableDay;
}

const dayStateObject: IAvailableDay = {
  mon: { available: false, color: 'gray' },
  tue: { available: false, color: 'gray' },
  wed: { available: false, color: 'gray' },
  thu: { available: false, color: 'gray' },
  fri: { available: false, color: 'gray' },
  sat: { available: false, color: 'gray' },
  sun: { available: false, color: 'gray' },
};

const WarningMessageArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.persianPink};
  margin-top: 2rem;
`;

const SideWarningMessage = styled.h5`
  color: ${theme.persianPink};
  margin-left: 1rem;
`;

const Write = () => {
  const [value, setValue] = useState();
  const [isOnline, setIsOnline] = useState(true);
  const [bookSearchModalOpen, setBookSearchModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [selectedBook, setBook] = useState<BookInfo>();
  const [warningMessage, setWarningMessage] = useState('');
  const [memberWarningeMessage, setMemberWarningeMessage] = useState('');
  const titleRef = createRef<HTMLInputElement>();
  const numberOfRecruitRef = createRef<HTMLInputElement>();
  const locationRef = createRef<HTMLInputElement>();
  const kakaoLinkRef = createRef<HTMLInputElement>();
  const kakaoPasswordRef = createRef<HTMLInputElement>();
  const setMessage = useSetRecoilState(messageHandler);

  const [dayState, setDayState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    dayStateObject
  );
  const quillRef = useRef<ReactQuill>(null);
  const navigation = useNavigate();

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);
      formData.append('nickname', '딸기검');
      formData.append('type', 'party');

      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();
      try {
        const response = await axios.post(
          'http://localhost:3001/v1/image',
          formData
        );

        const imageURL = response.data.result;
        editor.insertText(range.index, '업로드 중입니다...');

        const setImageFile = () => {
          editor.deleteText(range.index, 12);
          editor.insertEmbed(range.index, 'image', imageURL);
        };

        setTimeout(() => setImageFile(), 2000);
      } catch (error) {
        setMessage({
          name: 'FailImageUpload',
          message: '업로드에 실패했습니다',
          status: 'error',
        });
        setTimeout(() => setMessage(null), 1500);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'image',
    'imageURL',
  ];

  const regist = async (event) => {
    setWarningMessage('');
    const availableDayList = [];
    const dayList = Object.keys(dayStateObject);

    for (let i = 0; i < dayList.length; i++) {
      const day = dayList[i];
      if (dayStateObject[day].available) availableDayList.push(day);
    }
    const title = titleRef.current.value;
    const numberOfRecruit = Number(numberOfRecruitRef.current.value);
    const description = quillRef.current.value;
    const kakaoOpenChatLink = kakaoLinkRef.current.value;
    const kakaoOpenChatPassword = kakaoPasswordRef.current.value;

    // validation
    if (!title) {
      return setWarningMessage('제목을 입력해주세요');
    }

    const trimTitle = title.trim();

    if (trimTitle.length > 20) {
      return setWarningMessage('제목은 20자까지 입력가능합니다');
    }

    if (!numberOfRecruit) {
      return setWarningMessage('인원수를 입력해주세요');
    }

    if (!numberOfRecruit) {
      return setWarningMessage('그룹인원을 숫자로 입력해주세요');
    }

    if (!kakaoOpenChatLink) {
      return setWarningMessage('오픈채팅방 링크를 입력해주세요');
    }

    const descriptionRegex = /<[^>]*>?/g;
    if (!description || description === '') {
      return setWarningMessage('내용을 입력해주세요');
    }

    if (description.toString().replace(descriptionRegex, '').trim() === '') {
      return setWarningMessage('내용을 입력해주세요');
    }

    const splitAddress = address.split(' ');
    const [region, city, town] = splitAddress.map((address) => address.trim());

    const party: InsertParty = {
      title: trimTitle,
      numberOfRecruit,
      kakaoOpenChatLink,
      kakaoOpenChatPassword,
      isOnline,
      description: description.toString(),
      region: isOnline ? undefined : region,
      city: isOnline ? undefined : city,
      town: isOnline ? undefined : town,
    };

    try {
      const response = await registParty({
        party,
        availableDay: availableDayList,
        book: selectedBook,
      });
      navigation('/');
    } catch (error) {
      setMessage({
        name: error.name,
        message: '등록에 실패했습니다',
        status: 'error',
      });
      setTimeout(() => setMessage(null), 1500);
    }
  };

  const modifyAvailableDay = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const korDay = event.currentTarget.innerText;
    const engDay = dayObject[korDay];

    dayStateObject[engDay].available = !dayStateObject[engDay].available;
    setDayState(dayStateObject);
  };

  const setOnline = () => {
    setIsOnline(true);
  };

  const setOffline = () => {
    setIsOnline(false);
  };

  const controlBookSearchModal = () => {
    setBookSearchModalOpen(!bookSearchModalOpen);
  };

  const controlPostcodeModal = () => {
    setAddressModalOpen(!addressModalOpen);
  };

  const checkLimitNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemberWarningeMessage('');
    const number = event.currentTarget.value;
    const stringToNumber = Number(number);

    const validateNumber = RegExp('(^[0-9]*$)').test(number);

    if (!validateNumber) {
      event.currentTarget.value = '';
      return setMemberWarningeMessage('숫자를 입력해주세요');
    }

    if (stringToNumber < 2) {
      event.currentTarget.value = null;
      return setMemberWarningeMessage('최소 2명이상 가능합니다');
    }

    if (stringToNumber > 6) {
      event.currentTarget.value = null;
      return setMemberWarningeMessage('최대 6명까지 가능합니다');
    }
  };

  return (
    <MainTemplate>
      <Block>
        <TitleArea>
          <input placeholder={'제목을 입력해주세요!'} ref={titleRef} />
        </TitleArea>

        <div>
          <RecruitPlanArea>
            <h4>그룹 인원</h4>
            <RecruitPlanInput
              ref={numberOfRecruitRef}
              onChange={checkLimitNumber}
            />
            {memberWarningeMessage ? (
              <SideWarningMessage>{memberWarningeMessage}</SideWarningMessage>
            ) : null}
          </RecruitPlanArea>
          <RecruitPlanArea>
            <h4>카톡 오픈챗 링크</h4>
            <KakaoChatInput ref={kakaoLinkRef} />
          </RecruitPlanArea>
          <RecruitPlanArea>
            <h4>카톡 오픈챗 비밀번호</h4>
            <KakaoPasswordInput ref={kakaoPasswordRef} />
          </RecruitPlanArea>
          <RecruitPlanArea>
            <h5>카톡 채팅방 관련 정보는 그룹 가입이후 안내됩니다</h5>
          </RecruitPlanArea>
          <RecruitPlanArea>
            <h4>가능 요일</h4>
            <RoundButton
              size="SMALL"
              color={dayState.mon.available ? 'blue' : 'gray'}
              text="월"
              onClick={modifyAvailableDay}
            />
            <RoundButton
              size="SMALL"
              color={dayState.tue.available ? 'blue' : 'gray'}
              text="화"
              onClick={modifyAvailableDay}
            />
            <RoundButton
              size="SMALL"
              color={dayState.wed.available ? 'blue' : 'gray'}
              text="수"
              onClick={modifyAvailableDay}
            />
            <RoundButton
              size="SMALL"
              color={dayState.thu.available ? 'blue' : 'gray'}
              text="목"
              onClick={modifyAvailableDay}
            />
            <RoundButton
              size="SMALL"
              color={dayState.fri.available ? 'blue' : 'gray'}
              text="금"
              onClick={modifyAvailableDay}
            />
            <RoundButton
              size="SMALL"
              color={dayState.sat.available ? 'blue' : 'gray'}
              text="토"
              onClick={modifyAvailableDay}
            />
            <RoundButton
              size="SMALL"
              color={dayState.sun.available ? 'blue' : 'gray'}
              text="일"
              onClick={modifyAvailableDay}
            />
          </RecruitPlanArea>
          <RecruitPlanArea>
            <h4>모임 여부</h4>
            <RoundButton
              size="SMALL"
              color={isOnline ? 'blue' : 'gray'}
              text="온라인"
              onClick={setOnline}
            />
            <RoundButton
              size="SMALL"
              color={isOnline ? 'gray' : 'blue'}
              text="오프라인"
              onClick={setOffline}
            />
          </RecruitPlanArea>
          {isOnline ? null : (
            <RecruitPlanArea>
              <h4>그룹 위치</h4>
              {address ? (
                <>
                  <h4 ref={locationRef}>{address}</h4>
                  <BiSearch
                    size="1rem"
                    style={{ marginLeft: '1rem', cursor: 'pointer' }}
                    onClick={controlPostcodeModal}
                  />
                </>
              ) : (
                <AddressInput
                  placeholder="동네를 입력해주세요"
                  onClick={controlPostcodeModal}
                />
              )}
            </RecruitPlanArea>
          )}
          {addressModalOpen ? (
            <AddressModal
              isOpen={addressModalOpen}
              setOpen={setAddressModalOpen}
              currentAddress={address}
              setCurrentAddress={setAddress}
            ></AddressModal>
          ) : null}
          <RecruitPlanArea>
            <h4>도서 검색</h4>
            <BiSearch
              size="1.5rem"
              onClick={controlBookSearchModal}
              cursor="pointer"
            />
          </RecruitPlanArea>
          {bookSearchModalOpen ? (
            <BookSearchModal
              isOpen={bookSearchModalOpen}
              setOpen={controlBookSearchModal}
              setBook={setBook}
            ></BookSearchModal>
          ) : null}
        </div>
        <SearchResultArea>
          {selectedBook ? (
            <>
              <img src={selectedBook.thumbnail} />
              <BookInfoArea>
                <h4>{selectedBook.title}</h4>
                <h5>
                  {selectedBook.authors.map((author, index) => {
                    const seperator =
                      index === selectedBook.authors.length - 1 ? ' ' : ', ';
                    return author + seperator;
                  })}
                </h5>
              </BookInfoArea>
            </>
          ) : null}
        </SearchResultArea>
        <WriteArea
          ref={quillRef}
          theme="snow"
          placeholder="모집내용을 입력해주세요"
          value={value}
          modules={modules}
          formats={formats}
        ></WriteArea>
        <WarningMessageArea>
          <h5>{warningMessage}</h5>
        </WarningMessageArea>
        <ButtonArea>
          <RoundButton
            size="LARGE"
            color="blue"
            text="작성하기"
            onClick={regist}
          />
        </ButtonArea>
      </Block>
    </MainTemplate>
  );
};

export default Write;
