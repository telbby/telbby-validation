import { USER_ID_MAX_LENGTH, USER_ID_MIN_LENGTH } from './constants';
import { isOnlyUseEngAndNumbers, isStartWithEng } from './commonValidation';

export const isIdLengthValid = (id: string): boolean =>
  id.length >= USER_ID_MIN_LENGTH && id.length <= USER_ID_MAX_LENGTH;

export const isIdValid = (id: string): boolean =>
  isIdLengthValid(id) && isStartWithEng(id) && isOnlyUseEngAndNumbers(id);
