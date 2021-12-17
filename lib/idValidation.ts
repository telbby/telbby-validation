import {
  USER_ID_MAX_LENGTH,
  USER_ID_MIN_LENGTH,
  WARNING_ID_EMPTY,
  WARNING_ID_LENGTH,
  WARNING_ID_LETTERS,
  WARNING_ID_START,
} from './constants';
import { isOnlyUseEngAndNumbers, isStartWithEng } from './commonValidation';

export const isIdLengthValid = (id: string): boolean =>
  id.length >= USER_ID_MIN_LENGTH && id.length <= USER_ID_MAX_LENGTH;

export const idValidator = (id: string): readonly [boolean, string] => {
  if (!id.length) return [false, WARNING_ID_EMPTY];

  if (!isIdLengthValid(id)) return [false, WARNING_ID_LENGTH];

  if (!isStartWithEng(id)) return [false, WARNING_ID_START];

  if (!isOnlyUseEngAndNumbers(id)) return [false, WARNING_ID_LETTERS];

  return [true, ''];
};

export const isIdValid = (id: string): boolean => idValidator(id)[0];
