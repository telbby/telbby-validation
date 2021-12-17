import { isIdLengthValid, isIdValid, idValidator } from '../lib/idValidation';

export const WARNING_ID_EMPTY = 'Please enter your ID';
export const WARNING_ID_LENGTH = `ID must be 4 ~ 30 characters long`;
export const WARNING_ID_START = 'ID must start with English.';
export const WARNING_ID_LETTERS =
  'ID can only use uppercase letters, lowercase letters, and numbers';

describe('isPwLengthValid() 함수 테스트', () => {
  it('공백문자열은 거짓을 반환해야 합니다.', () => {
    expect(isIdLengthValid('')).toBe(false);
  });
  it('4자보다 길이가 짧을 경우 거짓을 반환해야 합니다.', () => {
    expect(isIdLengthValid('1')).toBe(false);
  });
  it('30자보다 길이가 길 경우 거짓을 반환해야 합니다.', () => {
    expect(isIdLengthValid(`${'1'.repeat(31)}`)).toBe(false);
  });
  it('4자일 경우 참을 반환해야 합니다.', () => {
    expect(isIdLengthValid('1234')).toBe(true);
  });
  it('30자일 경우 참을 반환해야 합니다.', () => {
    expect(isIdLengthValid(`${'1'.repeat(30)}`)).toBe(true);
  });
});

describe('idValidator() 함수 테스트', () => {
  it(`공백문자열은 거짓과 빈 문자열 경고 문자열을 반환해야 합니다.`, () => {
    const result = idValidator('');
    expect(result[0]).toBe(false);
    expect(result[1]).toBe(WARNING_ID_EMPTY);
  });

  describe('4자보다 길이가 짧을 경우 거짓과 길이 경고 문자열을 반환해야 합니다.', () => {
    it('영문만으로 이뤄졌지만 4자보다 길이가 짧을 경우 거짓과 길이 경고 문자열을 반환해야 합니다.', () => {
      const result = idValidator('a');
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_ID_LENGTH);
    });
    it('영문자로 시작하고 영문 + 숫자 조합이지만 4자보다 길이가 짧을 경우 거짓과 길이 경고 문자열을 반환해야 합니다.', () => {
      const result = idValidator('a1');
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_ID_LENGTH);
    });
  });

  describe('30자보다 길이가 길 경우 거짓과 길이 경고 문자열을 반환해야 합니다.', () => {
    it('영문만으로 이뤄졌지만 30자보다 길이가 길 경우 거짓과 길이 경고 문자열을 반환해야 합니다.', () => {
      const result = idValidator('a'.repeat(31));
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_ID_LENGTH);
    });
    it('영문자로 시작하고 영문 + 숫자 조합이지만 30자보다 길이가 길 경우 거짓과 길이 경고 문자열을 반환해야 합니다.', () => {
      const result = idValidator(`${'a'.repeat(30)}1`);
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_ID_LENGTH);
    });
  });

  describe('4자일 경우 참과 빈 문자열을 반환해야 합니다.', () => {
    it('영문만으로 이뤄졌고 4자일 경우 참과 빈 문자열을 반환해야 합니다.', () => {
      const result = idValidator('abcd');
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it('영문자로 시작하고 영문 + 숫자 조합이지면서 30자일 경우 참과 빈 문자열을 반환해야 합니다.', () => {
      const result = idValidator(`${'a'.repeat(29)}1`);
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
  });

  describe('30자일 경우 참과 빈 문자열을 반환해야 합니다.', () => {
    it('영문만으로 이뤄졌고 30자일 경우 참과 빈 문자열을 반환해야 합니다.', () => {
      const result = idValidator('a'.repeat(30));
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it('영문자로 시작하고 영문 + 숫자 조합이지면서 30자일 경우 참과 빈 문자열을 반환해야 합니다.', () => {
      const result = idValidator(`${'a'.repeat(29)}1`);
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
  });

  describe('4 ~ 30자 사이이지만 영문, 숫자 외에 다른 문자가 포함될 경우 거짓과 비허용 문자 경고 문자열을 반환해야 합니다.', () => {
    it(`4 ~ 30자 사이이지만 특수문자가 포함될 경우 거짓과 비허용 문자 경고 문자열을 반환해야 합니다.`, () => {
      const result = idValidator('ABCabc!@#');
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_ID_LETTERS);
    });
  });

  describe('4 ~ 30자 사이이지만 영문자가 아닌 다른 문자로 시작할 경우 거짓과 시작 문자 경고 문자열을 반환해야 합니다.', () => {
    it('4 ~ 30자 사이이지만 숫자로 시작할 경우 거짓과 시작 문자 경고 문자열을 반환해야 합니다.', () => {
      const result = idValidator('123ABC');
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_ID_START);
    });
    it('4 ~ 30자 사이이지만 특수문자로 시작할 경우 거짓과 시작 문자 경고 문자열을 반환해야 합니다.', () => {
      const result = idValidator('!123ABC');
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_ID_START);
    });
  });

  describe('4 ~ 30자 사이면서 영문자로 시작하고 영문, 숫자로만 이뤄졌으면 참과 빈 문자열을 반환해야 합니다.', () => {
    it('4 ~ 30자 사이의 영문자로 시작하는 영소문자 아이디는 참과 빈 문자열을 반환해야 합니다.', () => {
      const result = idValidator('abcde');
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it('4 ~ 30자 사이의 영문자로 시작하는 영대문자 아이디는 참과 빈 문자열을 반환해야 합니다.', () => {
      const result = idValidator('ABCDE');
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it('4 ~ 30자 사이의 영문자로 시작하는 영대소문자 + 숫자 조합은 참과 빈 문자열을 반환해야 합니다.', () => {
      const result = idValidator('ABCabc123');
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it('4 ~ 30자 사이의 영문자로 시작하는 영대문자 + 영소문자 조합은 참과 빈 문자열을 반환해야 합니다.', () => {
      const result = idValidator('ABCabc');
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
  });
});

describe('isIdValid() 함수 테스트', () => {
  it('공백문자열은 거짓을 반환해야 합니다.', () => {
    expect(isIdValid('')).toBe(false);
  });

  describe('4자보다 길이가 짧을 경우 거짓을 반환해야 합니다.', () => {
    it('영문만으로 이뤄졌지만 4자보다 길이가 짧을 경우 거짓을 반환해야 합니다.', () => {
      expect(isIdValid('a')).toBe(false);
      expect(isIdValid('A')).toBe(false);
      expect(isIdValid('Aa')).toBe(false);
    });
    it('영문자로 시작하고 영문 + 숫자 조합이지만 4자보다 길이가 짧을 경우 거짓을 반환해야 합니다.', () => {
      expect(isIdValid('a1')).toBe(false);
      expect(isIdValid('A1')).toBe(false);
    });
  });

  describe('30자보다 길이가 길 경우 거짓을 반환해야 합니다.', () => {
    it('영문만으로 이뤄졌지만 30자보다 길이가 길 경우 거짓을 반환해야 합니다.', () => {
      expect(isIdValid('a'.repeat(31))).toBe(false);
      expect(isIdValid('A'.repeat(31))).toBe(false);
      expect(isIdValid(`${'A'.repeat(30)}a`)).toBe(false);
    });
    it('영문자로 시작하고 영문 + 숫자 조합이지만 30자보다 길이가 길 경우 거짓을 반환해야 합니다.', () => {
      expect(isIdValid(`${'a'.repeat(30)}1`)).toBe(false);
      expect(isIdValid(`${'A'.repeat(30)}1`)).toBe(false);
    });
  });

  describe('4자일 경우 참을 반환해야 합니다.', () => {
    it('영문만으로 이뤄졌고 4자일 경우 참을 반환해야 합니다.', () => {
      expect(isIdValid('abcd')).toBe(true);
      expect(isIdValid('abCD')).toBe(true);
      expect(isIdValid('ABCD')).toBe(true);
    });
    it('영문자로 시작하고 영문 + 숫자 조합이지면서 30자일 경우 참을 반환해야 합니다.', () => {
      expect(isIdValid(`${'a'.repeat(29)}1`)).toBe(true);
      expect(isIdValid(`${'A'.repeat(29)}1`)).toBe(true);
    });
  });

  describe('30자일 경우 참을 반환해야 합니다.', () => {
    it('영문만으로 이뤄졌고 30자일 경우 참을 반환해야 합니다.', () => {
      expect(isIdValid(`${'a'.repeat(30)}`)).toBe(true);
      expect(isIdValid(`${'A'.repeat(30)}`)).toBe(true);
      expect(isIdValid(`${'A'.repeat(29)}a`)).toBe(true);
    });
    it('영문자로 시작하고 영문 + 숫자 조합이지면서 30자일 경우 참을 반환해야 합니다.', () => {
      expect(isIdValid(`${'a'.repeat(29)}1`)).toBe(true);
      expect(isIdValid(`${'A'.repeat(29)}1`)).toBe(true);
    });
  });

  describe('4 ~ 30자 사이이지만 영문, 숫자 외에 다른 문자가 포함될 경우 거짓을 반환해야 합니다.', () => {
    it(`특수문자가 포함될 경우 거짓을 반환해야 합니다.`, () => {
      expect(isIdValid('ABCabc!@#')).toBe(false);
    });
  });

  describe('4 ~ 30자 사이이지만 영문자가 아닌 다른 문자로 시작할 경우 거짓을 반환해야 합니다.', () => {
    it('4 ~ 30자 사이이지만 숫자로 시작할 경우 거짓을 반환해야 합니다.', () => {
      expect(isIdValid('123ABC')).toBe(false);
    });
    it('4 ~ 30자 사이이지만 특수문자로 시작할 경우 거짓을 반환해야 합니다.', () => {
      expect(isIdValid('!@^ABC')).toBe(false);
    });
  });

  describe('4 ~ 30자 사이면서 영문자로 시작하고 영문, 숫자로만 이뤄졌으면 참을 반환해야 합니다.', () => {
    it('4 ~ 30자 사이의 영문자로 시작하는 영소문자 아이디는 참을 반환해야 합니다.', () => {
      expect(isIdValid('abcde')).toBe(true);
      expect(isIdValid('edcba')).toBe(true);
      expect(isIdValid('testid')).toBe(true);
    });
    it('4 ~ 30자 사이의 영문자로 시작하는 영대문자 아이디는 참을 반환해야 합니다.', () => {
      expect(isIdValid('ABCDE')).toBe(true);
      expect(isIdValid('EDCBA')).toBe(true);
      expect(isIdValid('TESTID')).toBe(true);
    });
    it('4 ~ 30자 사이의 영문자로 시작하는 영대소문자 + 숫자 조합은 참을 반환해야 합니다.', () => {
      expect(isIdValid('ABCabc123')).toBe(true);
      expect(isIdValid('ABC123')).toBe(true);
      expect(isIdValid('a321bc')).toBe(true);
    });
    it('4 ~ 30자 사이의 영문자로 시작하는 영대문자 + 영소문자 조합은 참을 반환해야 합니다.', () => {
      expect(isIdValid('ABCabc')).toBe(true);
      expect(isIdValid('ABCbbb')).toBe(true);
      expect(isIdValid('aCCCaaab')).toBe(true);
    });
  });
});
