import { USER_PW_MAX_LENGTH, USER_PW_MIN_LENGTH } from './constants';
import {
  isHasLowerEng,
  isHasNumber,
  isHasSpecialChar,
  isHasUpperEng,
} from './commonValidation';

export const isPwCombinationValid = (pw: string): boolean => {
  const hasCount =
    Number(isHasLowerEng(pw)) +
    Number(isHasUpperEng(pw)) +
    Number(isHasSpecialChar(pw)) +
    Number(isHasNumber(pw));
  return hasCount >= 2;
};

export const isPwLengthValid = (pw: string): boolean =>
  pw.length >= USER_PW_MIN_LENGTH && pw.length <= USER_PW_MAX_LENGTH;

export const isPwValid = (pw: string): boolean =>
  isPwLengthValid(pw) && isPwCombinationValid(pw);
