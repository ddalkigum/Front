import { atom } from 'recoil';

export const authModalOpen = atom({
  key: 'isOpen',
  default: false,
});

export const currentUser = atom({
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
