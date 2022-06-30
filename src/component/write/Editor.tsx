import React from 'react';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useSetRecoilState } from 'recoil';
import { messageHandler } from '../../atom';
import { uploadImage } from '../../lib/api/image';
import { User } from '../../types/entity';

const { useState, useRef, useMemo } = React;

const WriteArea = styled(ReactQuill)`
  height: 540px;
  max-width: 100%;
  margin-bottom: 2rem;
`;

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

const Editor = ({
  user,
  currentDescription,
  quillRef,
}: {
  user: User;
  currentDescription?: string;
  quillRef: React.MutableRefObject<ReactQuill>;
}) => {
  const setMessage = useSetRecoilState(messageHandler);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files[0];
      try {
        const response = await uploadImage(user, file, 'party');
        const editor = quillRef.current.getEditor();

        const range = editor.getSelection();

        const imageURL = response.result;
        editor.insertText(range.index, '업로드 중입니다...');

        const setImageFile = () => {
          editor.deleteText(range.index, 12);
          editor.insertEmbed(range.index, 'image', imageURL);
        };

        setTimeout(() => setImageFile(), 1500);
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
          ['bold', 'italic', 'strike'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  return (
    <WriteArea
      ref={quillRef}
      theme="snow"
      placeholder="모집내용을 입력해주세요"
      value={currentDescription}
      modules={modules}
      formats={formats}
    ></WriteArea>
  );
};

export default React.memo(Editor);
