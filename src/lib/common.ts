import { User } from '../types/entity';

export const deepClone = <T>(object: any): T => {
  const clone = {};

  Object.keys(object).map((key) => {
    clone[key] = object[key];
  });

  return clone as T;
};
