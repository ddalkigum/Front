import * as Sentry from '@sentry/react';

export async function handleAPI<T>(api: Promise<T>): Promise<T> {
  try {
    return await api;
  } catch (error) {
    if (error.response.status === 500) {
      if (process.env.NODE_ENV === 'production') {
        Sentry.captureException(error.response);
      }
    }

    if (error.response) {
      return error.response.data;
    }

    if (error.request) {
      return error.request;
    }
  }
}
