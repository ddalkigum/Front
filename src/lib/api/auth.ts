import apiClient from './client';
import {
  BaseResponse,
  CheckCertificationResponse,
  SignupResponse,
} from './interface';

export const sendEmailResponse = async (email: string) => {
  const response = await apiClient.post<BaseResponse<string>>(
    '/v1/auth/send-email',
    { email }
  );
  return response.data;
};

export const checkCertificationCodeResponse = async (code: string) => {
  const response = await apiClient.get<CheckCertificationResponse>(
    `/v1/auth/check?code=${code}`
  );
  return response.data;
};

export const signupResponse = async (
  code: string,
  email: string,
  nickname: string
) => {
  const response = await apiClient.post<SignupResponse>(
    '/v1/auth/signup/email',
    {
      code,
      email,
      nickname,
    }
  );
  return response.data;
};

export const checkLoginResponse = async () => {
  const response = await apiClient.get<BaseResponse<string>>(
    '/v1/auth/check/login'
  );
  return response.data;
};

export const logoutResponse = async () => {
  const response = await apiClient.delete<BaseResponse<string>>(
    '/v1/auth/logout'
  );
  return response.data;
};
