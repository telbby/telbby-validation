import {
  isHasLowerEng,
  isHasNumber,
  isHasSpecialChar,
  isHasUpperEng,
  isOnlyUseEngAndNumbers,
  isStartWithEng,
} from '../lib/commonValidation';

describe('isStartWithEng() 함수 테스트', () => {
  it('영문자로 시작하면 참을 반환해야 합니다', () => {
    expect(isStartWithEng('a123')).toBe(true);
    expect(isStartWithEng('A123')).toBe(true);
  });
  it('그 외 문자로 시작하면 거짓을 반환해야 합니다', () => {
    expect(isStartWithEng('1abc')).toBe(false);
    expect(isStartWithEng('!@abc')).toBe(false);
  });
});

describe('isOnlyUseEngAndNumbers() 함수 테스트', () => {
  it('영문자와 숫자만 사용할 경우 참을 반환해야 합니다', () => {
    expect(isOnlyUseEngAndNumbers('a123')).toBe(true);
    expect(isOnlyUseEngAndNumbers('A123')).toBe(true);
    expect(isOnlyUseEngAndNumbers('abe134')).toBe(true);
  });
  it('그 외 문자를 포함하면 거짓을 반환해야 합니다', () => {
    expect(isOnlyUseEngAndNumbers('1abc@#')).toBe(false);
    expect(isOnlyUseEngAndNumbers('abc호호')).toBe(false);
    expect(isOnlyUseEngAndNumbers('abc!!')).toBe(false);
  });
});

describe('isHasUpperEng() 함수 테스트', () => {
  it('영대문자가 포함되어 있을 경우 참을 반환해야 합니다.', () => {
    expect(isHasUpperEng('aefweABC')).toBe(true);
    expect(isHasUpperEng('ABCWEFWEF')).toBe(true);
    expect(isHasUpperEng('WEF231')).toBe(true);
  });
  it('영대문자가 포함되어 있지 않을 경우 거짓을 반환해야 합니다.', () => {
    expect(isHasUpperEng('aefwe123')).toBe(false);
    expect(isHasUpperEng('12312312#$')).toBe(false);
    expect(isHasUpperEng('##@231')).toBe(false);
  });
});

describe('isHasLowerEng() 함수 테스트', () => {
  it('영소문자가 포함되어 있을 경우 참을 반환해야 합니다.', () => {
    expect(isHasLowerEng('aefweABC')).toBe(true);
    expect(isHasLowerEng('!3@ewfwef213')).toBe(true);
    expect(isHasLowerEng('324wefw23')).toBe(true);
  });
  it('영소문자가 포함되어 있지 않을 경우 거짓을 반환해야 합니다.', () => {
    expect(isHasLowerEng('EFWF123')).toBe(false);
    expect(isHasLowerEng('12312312#$')).toBe(false);
    expect(isHasLowerEng('##@231')).toBe(false);
  });
});

describe('isHasSpecialChar() 함수 테스트', () => {
  it('특수문자가 포함되어 있을 경우 참을 반환해야 합니다.', () => {
    expect(isHasSpecialChar('aefweABC#@')).toBe(true);
    expect(isHasSpecialChar('!3@ewfwef213')).toBe(true);
    expect(isHasSpecialChar('324w#@#@efw23')).toBe(true);
  });
  it('특수문자가 포함되어 있지 않을 경우 거짓을 반환해야 합니다.', () => {
    expect(isHasSpecialChar('EFWF123')).toBe(false);
    expect(isHasSpecialChar('12312312')).toBe(false);
    expect(isHasSpecialChar('ABC231')).toBe(false);
  });
});

describe('isHasNumber() 함수 테스트', () => {
  it('숫자가 포함되어 있을 경우 참을 반환해야 합니다.', () => {
    expect(isHasNumber('aefwe123#@')).toBe(true);
    expect(isHasNumber('!3@ewfwef213')).toBe(true);
    expect(isHasNumber('324w#@#@efw23')).toBe(true);
  });
  it('숫자가 포함되어 있지 않을 경우 거짓을 반환해야 합니다.', () => {
    expect(isHasNumber('EFW#$@##')).toBe(false);
    expect(isHasNumber('wefwefwef')).toBe(false);
    expect(isHasNumber('ABC(*(')).toBe(false);
  });
});
