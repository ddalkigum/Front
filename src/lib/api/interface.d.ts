export interface ErrorResponse {
  name: string;
  message;
  string;
}

export interface BaseResponse<T> {
  status: string;
  result: T & ErrorResponse;
}

// Auth
export interface SignupResult {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
  createdAt: string;
}

type Message = string;

export type SignupResponse = BaseResponse<SignupResult & Message>;

interface CheckCertificationResult {
  isSignup: boolean;
  email: string;
}

export type CheckCertificationResponse = BaseResponse<CheckCertificationResult>;

// User
export interface UserProfile {
  id: number;
  nickname: string;
  profileImage: string;
}

export type IGetUserProfile = BaseResponse<UserProfile>;
