import { MainCard } from '../../container/home/HomeLayout';
import { PartyDetailResult } from '../../container/party/DetailLayout';
import { Book, Party, User } from '../../types/entity';
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

export interface IParty {
  title: string;
  numberOfRecruit: number;
  isOnline: boolean;
  description: string;
  region?: string;
  city?: string;
  town?: string;
}

interface PartyContext {
  party: IParty;
  availableDay: string[];
  book: BookInfo;
  userID?: number;
}

export const getBookList = async (title: string, page: number) => {
  const encodedTitle = encodeURIComponent(title);
  const response = await apiClient.get<BaseResponse<SearchBookResult>>(
    `/v1/party/search/book?title=${encodedTitle}&page=${page}`
  );
  return response.data;
};

export const registParty = async (context: PartyContext) => {
  const response = await apiClient.post('/v1/party/regist', context);
  return response.data;
};

export const getPartyList = async (page: number) => {
  const response = await apiClient.get<BaseResponse<MainCard[]>>(
    '/v1/party/recent'
  );
  return response.data;
};

export const getPartyDetail = async (nickname: string, title: string) => {
  const response = await apiClient.get<BaseResponse<PartyDetailResult>>(
    `/v1/party/${nickname}/${title}`
  );
  return response.data;
};
