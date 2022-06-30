import { User } from '../../types/entity';
import apiClient from './client';
import { BaseResponse } from './interface';

export const getUserProfileResponse = async (nickname: string) => {
  const encodedNickname = encodeURIComponent(nickname);
  const response = await apiClient.get<BaseResponse<User>>(
    `/v1/user/profile/${encodedNickname}`
  );
  return response.data;
};

export const getUserProfileByToken = async () => {
  const response = await apiClient.get<BaseResponse<User>>('/v1/user/current');
  return response.data;
};

export const updateUserProfileResponse = async (
  updateCondition: Partial<User>
) => {
  const response = await apiClient.patch<BaseResponse<Partial<User>>>(
    '/v1/user/profile',
    updateCondition
  );
  return response.data;
};

export const deactivateUserResponse = async () => {
  const response = await apiClient.delete<BaseResponse<void>>('/v1/user');
  return response.data;
};
