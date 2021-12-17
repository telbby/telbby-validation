import {
  USER_PW_MAX_LENGTH,
  USER_PW_MIN_LENGTH,
  WARNING_PW_COMBINATION,
  WARNING_PW_EMPTY,
  WARNING_PW_LENGTH,
} from './constants';
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

export const pwValidator = (pw: string): readonly [boolean, string] => {
  if (!pw.length) return [false, WARNING_PW_EMPTY];

  if (!isPwLengthValid(pw)) return [false, WARNING_PW_LENGTH];

  if (!isPwCombinationValid(pw)) return [false, WARNING_PW_COMBINATION];

  return [true, ''];
};

export const isPwValid = (pw: string): boolean => pwValidator(pw)[0];
