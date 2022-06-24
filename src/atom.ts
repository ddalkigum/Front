import { atom } from 'recoil';

export const authModalOpen = atom({
  key: 'authModalisOpen',
  default: false,
});

export const currentUser = atom<{
  id: number;
  nickname: string;
  profileImage: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}>({
  key: 'currentUser',
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
