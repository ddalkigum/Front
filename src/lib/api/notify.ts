import { Notify } from '../../types/entity';
import apiClient from './client';
import { BaseResponse } from './interface';

export const getNotify = async () => {
  const response = await apiClient.get<BaseResponse<Notify>>('/v1/notify');
  return response.data;
};

export const updateNotify = async (type: string, isActive: boolean) => {
  const response = await apiClient.patch<BaseResponse<Notify>>('/v1/notify', {
    type,
    isActive,
  });

  return response.data;
};
