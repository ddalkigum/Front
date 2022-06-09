import { atom } from 'recoil';

export const authModalOpen = atom({
  key: 'isOpen',
  default: false,
});

export const isSafeUser = atom({
  key: 'isSafe',
  default: false,
});
