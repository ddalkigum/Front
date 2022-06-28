export interface DateTime {
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends DateTime {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
}

export interface Party extends DateTime {
  id: string;
  title: string;
  slug: string;
  numberOfRecruit: number;
  openChatURL: string;
  openChatPassword: string;
  isOnline: boolean;
  region?: string;
  city?: string;
  town?: string;
  description: string;
  ownerID: number;
  bookID: string;
}

export interface Participant extends DateTime {
  id: number;
  isOwner: boolean;
  isAccept: boolean;
  userID: number;
  partyID: string;
}

export interface Book {
  id: string;
  authors: string & string[];
  title: string;
  thumbnail: string;
}

export interface Token {
  id: string;
  userID: number;
  accessToken: string;
  refreshToken: string;
}

export interface AvailableDay {
  id: number;
  dayID: string;
  partyID: string;
}
