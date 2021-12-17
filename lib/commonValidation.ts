const REG_START_ENG = /^[a-zA-Z]/;

const REG_ONLY_USE_ENG_AND_NUM = /^[a-zA-Z0-9]{0,}$/;

const REG_UPPER_ENG = /[A-Z]/;

const REG_LOWER_ENG = /[a-z]/;

const REG_SPECIAL_CHAR = /[<>{}|;:.,~!?@#$%^=&*"\\/]/;

const REG_NUM = /[0-9]/;

export const isStartWithEng = (s: string): boolean => REG_START_ENG.test(s);

export const isOnlyUseEngAndNumbers = (s: string): boolean =>
  REG_ONLY_USE_ENG_AND_NUM.test(s);

export const isHasUpperEng = (s: string): boolean => REG_UPPER_ENG.test(s);

export const isHasLowerEng = (s: string): boolean => REG_LOWER_ENG.test(s);

export const isHasSpecialChar = (s: string): boolean =>
  REG_SPECIAL_CHAR.test(s);

export const isHasNumber = (s: string): boolean => REG_NUM.test(s);
