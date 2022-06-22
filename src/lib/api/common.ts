import { BaseResponse } from './interface';

export async function handleAPI<T>(api: Promise<T>): Promise<T> {
  try {
    return await api;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    if (error.request) {
      return error.request;
    }
  }
}
