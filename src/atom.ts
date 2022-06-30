import { atom } from 'recoil';

export const authModalHandler = atom({
  key: 'authModalisOpen',
  default: false,
});

export const userHandler = atom<{
  id: number;
  nickname: string;
  profileImage: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}>({
  key: 'userHandler',
  default: null,
});

export const messageHandler = atom<{
  name: string;
  message: string;
  status: 'error' | 'success';
} | null>({
  key: 'message',
  default: null,
});
