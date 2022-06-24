import { User } from '../../types/entity';
import apiClient from './client';
import { BaseResponse } from './interface';

type UploadType = 'profile' | 'party';

export const uploadImage = async (
  user: User,
  image: File,
  type: UploadType
) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('type', type);
  formData.append('user', JSON.stringify(user));
  const response = await apiClient.post<BaseResponse<string>>(
    '/v1/image',
    formData
  );
  return response.data;
};
