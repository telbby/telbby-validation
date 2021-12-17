export const USER_ID_MIN_LENGTH = 4;
export const USER_ID_MAX_LENGTH = 30;

export const USER_PW_MIN_LENGTH = 10;
export const USER_PW_MAX_LENGTH = 35;

export const WARNING_ID_EMPTY = 'Please enter your ID';
export const WARNING_ID_ALL = `ID must be between ${USER_ID_MIN_LENGTH} and ${USER_ID_MAX_LENGTH} characters long and can only use uppercase and lowercase letters and numbers, and must start with an English letter.`;
export const WARNING_ID_LENGTH = `ID must be ${USER_ID_MIN_LENGTH} ~ ${USER_ID_MAX_LENGTH} characters long`;
export const WARNING_ID_START = 'ID must start with English.';
export const WARNING_ID_LETTERS =
  'ID can only use uppercase letters, lowercase letters, and numbers';

export const WARNING_PW_EMPTY = 'Please enter your password';
export const WARNING_PW_ALL = `The password must be between ${USER_PW_MIN_LENGTH} and ${USER_ID_MAX_LENGTH} characters and must be a combination of at least two of uppercase and lowercase letters, numbers, and special characters.`;
export const WARNING_PW_LENGTH = `The password must be ${USER_PW_MIN_LENGTH} ~ ${USER_PW_MAX_LENGTH} characters long`;
export const WARNING_PW_COMBINATION =
  'The password must be a combination of at least two of uppercase and lowercase letters, numbers, and special characters.';
