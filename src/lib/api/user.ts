import apiClient from './client';
import { BaseResponse, IGetUserProfile } from './interface';

export const getUserProfile = async (nickname: string) => {
  const encodedNickname = encodeURIComponent(nickname);
  const response = await apiClient.get<IGetUserProfile>(
    `/v1/user/profile/${encodedNickname}}`
  );
  return response.data;
};

export const secession = async (nickname: string, accessToken: string) => {
  const encodedNickname = encodeURIComponent(nickname);
  const response = await apiClient.delete<BaseResponse<string>>(
    `/v1/user/session/${encodedNickname}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
};
