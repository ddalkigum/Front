import { config } from '../../config';
import apiClient from './client';
import { BaseResponse } from './interface';

export interface BookMeta {
  page: number;
  nextPage?: number;
  isEnd: boolean;
  lastPage: number;
}

export interface BookInfo {
  id: string;
  authors: string[];
  thumbnail: string;
  title: string;
}

export interface SearchBookResult {
  bookList: BookInfo[];
  meta: BookMeta;
}

export type BookList = BookInfo[];

export const getBookList = async (title: string, page: number) => {
  const encodedTitle = encodeURIComponent(title);
  const response = await apiClient.get<BaseResponse<SearchBookResult>>(
    `/v1/party/search/book?title=${encodedTitle}&page=${page}`
  );
  return response.data;
};
