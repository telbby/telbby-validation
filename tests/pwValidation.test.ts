import {
  isPwValid,
  isPwLengthValid,
  isPwCombinationValid,
  pwValidator,
} from '../lib/pwValidation';

export const WARNING_PW_EMPTY = 'Please enter your password';
export const WARNING_PW_LENGTH = `The password must be 10 ~ 35 characters long`;
export const WARNING_PW_COMBINATION =
  'The password must be a combination of at least two of uppercase and lowercase letters, numbers, and special characters.';

describe('isPwLengthValid() 함수 테스트', () => {
  it(`공백문자열은 거짓을 반환해야 합니다.`, () => {
    expect(isPwLengthValid('')).toBe(false);
  });
  it(`10자보다 길이가 짧을 경우 거짓을 반환해야 합니다.`, () => {
    expect(isPwLengthValid('1')).toBe(false);
  });
  it(`35자보다 길이가 길 경우 거짓을 반환해야 합니다.`, () => {
    expect(isPwLengthValid(`${'1'.repeat(36)}`)).toBe(false);
  });
  it(`10자일 경우 참을 반환해야 합니다.`, () => {
    expect(isPwLengthValid('1234567890')).toBe(true);
  });
  it(`35자일 경우 참을 반환해야 합니다.`, () => {
    expect(isPwLengthValid(`${'1'.repeat(35)}`)).toBe(true);
  });
});

describe('isPwCombinationValid() 함수 테스트', () => {
  describe('영대소문자, 특수문자, 숫자를 조합하지 않을 경우 거짓을 반환해야 합니다.', () => {
    it('영대문자만 사용할 경우 거짓을 반환해야 합니다.', () => {
      expect(isPwCombinationValid('ABCDEFGHIJ')).toBe(false);
      expect(isPwCombinationValid('JIHGFEDCBA')).toBe(false);
      expect(isPwCombinationValid('WEFWEFEWFF')).toBe(false);
    });
    it('영소문자만 사용할 경우 거짓을 반환해야 합니다.', () => {
      expect(isPwCombinationValid('abcdefghij')).toBe(false);
      expect(isPwCombinationValid('jihgfedcba')).toBe(false);
      expect(isPwCombinationValid('wefwefewfw')).toBe(false);
    });
    it('숫자만 사용할 경우 거짓을 반환해야 합니다.', () => {
      expect(isPwCombinationValid('1234567890')).toBe(false);
      expect(isPwCombinationValid('0987654321')).toBe(false);
      expect(isPwCombinationValid('1231231313')).toBe(false);
    });
    it('특수문자만 사용할 경우 거짓을 반환해야 합니다.', () => {
      expect(isPwCombinationValid('^%$%^&*(*^')).toBe(false);
      expect(isPwCombinationValid(')(*&**&^&*')).toBe(false);
      expect(isPwCombinationValid('#@$#$%##%#')).toBe(false);
    });
  });

  describe('영대소문자, 특수문자, 숫자 중 2가지 이상 조합이면 참을 반환해야 합니다.', () => {
    it('영대문자 + 영소문자 조합은 참을 반환해야 합니다. ', () => {
      expect(isPwCombinationValid('ABCabcABCa')).toBe(true);
      expect(isPwCombinationValid('abAbabABab')).toBe(true);
      expect(isPwCombinationValid('aaaBBBaaaB')).toBe(true);
    });
    it('영대문자 + 숫자 조합은 참을 반환해야 합니다. ', () => {
      expect(isPwCombinationValid('ABC123ABC123')).toBe(true);
      expect(isPwCombinationValid('AB12AB12ABB')).toBe(true);
      expect(isPwCombinationValid('BBB111BBB111')).toBe(true);
    });
    it('영대문자 + 특수문자 조합은 참을 반환해야 합니다. ', () => {
      expect(isPwCombinationValid('ABC!@$ABC!@$')).toBe(true);
      expect(isPwCombinationValid('AB!@AB!@AB!')).toBe(true);
      expect(isPwCombinationValid('BBB!@$BBB!@$')).toBe(true);
    });
    it('영소문자 + 숫자 조합은 참을 반환해야 합니다. ', () => {
      expect(isPwCombinationValid('abc123abc123')).toBe(true);
      expect(isPwCombinationValid('ab12ab12abb')).toBe(true);
      expect(isPwCombinationValid('bbb111bbb111')).toBe(true);
    });
    it('영소문자 + 특수문자 조합은 참을 반환해야 합니다. ', () => {
      expect(isPwCombinationValid('abc!@$abc!@$')).toBe(true);
      expect(isPwCombinationValid('ab!@ab!@ab!')).toBe(true);
      expect(isPwCombinationValid('bbb!@$bbb!@$')).toBe(true);
    });
    it('숫자 + 특수문자 조합은 참을 반환해야 합니다. ', () => {
      expect(isPwCombinationValid('123!@$123!@$')).toBe(true);
      expect(isPwCombinationValid('12!@12!@12!')).toBe(true);
      expect(isPwCombinationValid('222!@$222!@$')).toBe(true);
    });
  });
});

describe('pwValidator() 함수 테스트', () => {
  it(`공백문자열은 거짓과 빈 문자열 경고 문자열을 반환해야 합니다.`, () => {
    const result = pwValidator('');
    expect(result[0]).toBe(false);
    expect(result[1]).toBe(WARNING_PW_EMPTY);
  });

  describe('10자보다 길이가 짧은 경우 거짓과 길이 경고 문자열을 반환해야 합니다.', () => {
    it(`영소문자 + 숫자 조합이지만 10자보다 길이가 짧을 경우 거짓과 길이 경고 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator('a1');
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_LENGTH);
    });
    it(`영대문자 + 숫자 조합이지만 10자보다 길이가 짧을 경우 거짓과 길이 경고 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator('A1');
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_LENGTH);
    });
    it(`특수문자 + 숫자 조합이지만 10자보다 길이가 짧을 경우 거짓과 길이 경고 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator('#1');
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_LENGTH);
    });
    it(`특수문자 + 영대문자 조합이지만 10자보다 길이가 짧을 경우 거짓과 길이 경고 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator('#A');
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_LENGTH);
    });
    it(`특수문자 + 영소문자 조합이지만 10자보다 길이가 짧을 경우 거짓과 길이 경고 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator('#a');
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_LENGTH);
    });
    it(`영대문자 + 영소문자 조합이지만 10자보다 길이가 짧을 경우 거짓과 길이 경고 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator('Aa');
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_LENGTH);
    });
  });

  describe('35자보다 길이가 길 경우 거짓과 길이 경고 문자열을 반환해야 합니다.', () => {
    it(`영소문자 + 숫자 조합이지만 35자보다 길이가 길 경우 거짓과 길이 경고 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'a'.repeat(35)}1`);
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_LENGTH);
    });
    it(`영대문자 + 숫자 조합이지만 35자보다 길이가 길 경우 거짓과 길이 경고 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'A'.repeat(35)}1`);
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_LENGTH);
    });
    it(`특수문자 + 숫자 조합이지만 35자보다 길이가 길 경우 거짓과 길이 경고 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'#'.repeat(35)}1`);
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_LENGTH);
    });
    it(`특수문자 + 영대문자 조합이지만 35자보다 길이가 길 경우 거짓과 길이 경고 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'#'.repeat(35)}A`);
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_LENGTH);
    });
    it(`특수문자 + 영소문자 조합이지만 35자보다 길이가 길 경우 거짓과 길이 경고 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'#'.repeat(35)}a`);
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_LENGTH);
    });
    it(`영대문자 + 영소문자 조합이지만 35자보다 길이가 길 경우 거짓과 길이 경고 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'A'.repeat(35)}a`);
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_LENGTH);
    });
  });

  describe(`10자일 경우 참과 빈 문자열을 반환해야 합니다.`, () => {
    expect(isPwValid('123456789a')).toBe(true);
    it('영소문자 + 숫자 조합이고 10자일 경우 참과 빈 문자열을 반환해야 합니다.', () => {
      const result = pwValidator(`${'a'.repeat(9)}1`);
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it(`영대문자 + 숫자 조합이고 10자일 경우 참과 빈 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'A'.repeat(9)}1`);
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it(`특수문자 + 숫자 조합이고 10자일 경우 참과 빈 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'#'.repeat(9)}1`);
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it(`특수문자 + 영대문자 조합이고 10자일 경우 참과 빈 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'#'.repeat(9)}A`);
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it(`특수문자 + 영소문자 조합이고 10자일 경우 참과 빈 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'#'.repeat(9)}a`);
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it(`영대문자 + 영소문자 조합이고 10자일 경우 참과 빈 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'A'.repeat(9)}a`);
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
  });

  describe(`35자일 경우 참과 빈 문자열을 반환해야 합니다.`, () => {
    expect(isPwValid('123456789a')).toBe(true);
    it('영소문자 + 숫자 조합이고 35자일 경우 참과 빈 문자열을 반환해야 합니다.', () => {
      const result = pwValidator(`${'a'.repeat(34)}1`);
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it(`영대문자 + 숫자 조합이고 35자일 경우 참과 빈 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'A'.repeat(34)}1`);
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it(`특수문자 + 숫자 조합이고 35자일 경우 참과 빈 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'#'.repeat(34)}1`);
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it(`특수문자 + 영대문자 조합이고 35자일 경우 참과 빈 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'#'.repeat(34)}A`);
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it(`특수문자 + 영소문자 조합이고 35자일 경우 참과 빈 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'#'.repeat(34)}a`);
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it(`영대문자 + 영소문자 조합이고 35자일 경우 참과 빈 문자열을 반환해야 합니다.`, () => {
      const result = pwValidator(`${'A'.repeat(34)}a`);
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
  });

  describe('10 ~ 35자 사이면서 영대소문자, 특수문자, 숫자 중 2가지 이상 조합이면 참과 빈 문자열을 반환해야 합니다.', () => {
    it('10 ~ 35자 사이의 영대문자 + 영소문자 조합은 참과 빈 문자열을 반환해야 합니다. ', () => {
      const result = pwValidator('ABCabcABCa');
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it('10 ~ 35자 사이의 영대문자 + 숫자 조합은 참과 빈 문자열을 반환해야 합니다. ', () => {
      const result = pwValidator('ABC123ABC123');
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it('10 ~ 35자 사이의 영대문자 + 특수문자 조합은 참과 빈 문자열을 반환해야 합니다. ', () => {
      const result = pwValidator('ABC!@$ABC!@$');
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it('10 ~ 35자 사이의 영소문자 + 숫자 조합은 참과 빈 문자열을 반환해야 합니다. ', () => {
      const result = pwValidator('abc123abc123');
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it('10 ~ 35자 사이의 영소문자 + 특수문자 조합은 참과 빈 문자열을 반환해야 합니다. ', () => {
      const result = pwValidator('abc!@$abc!@$');
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
    it('10 ~ 35자 사이의 숫자 + 특수문자 조합은 참과 빈 문자열을 반환해야 합니다. ', () => {
      const result = pwValidator('123!@$123!@$');
      expect(result[0]).toBe(true);
      expect(result[1]).toBe('');
    });
  });

  describe('10 ~ 35자 사이이지만 영대소문자, 특수문자, 숫자를 조합하지 않을 경우 거짓과 조합 경고 문자열을 반환해야 합니다.', () => {
    it('10 ~ 35자 사이이지만 영대문자만 사용할 경우 거짓과 조합 경고 문자열을 반환해야 합니다.', () => {
      const result = pwValidator('ABCDEFGHIJ');
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_COMBINATION);
    });
    it('10 ~ 35자 사이이지만 영소문자만 사용할 경우 거짓과 조합 경고 문자열을 반환해야 합니다.', () => {
      const result = pwValidator('abcdefghij');
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_COMBINATION);
    });
    it('10 ~ 35자 사이이지만 숫자만 사용할 경우 거짓과 조합 경고 문자열을 반환해야 합니다.', () => {
      const result = pwValidator('1234567890');
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_COMBINATION);
    });
    it('10 ~ 35자 사이이지만 특수문자만 사용할 경우 거짓과 조합 경고 문자열을 반환해야 합니다.', () => {
      const result = pwValidator('^%$%^&*(*^');
      expect(result[0]).toBe(false);
      expect(result[1]).toBe(WARNING_PW_COMBINATION);
    });
  });
});

describe('isPwValid() 함수 테스트', () => {
  it(`공백문자열은 거짓을 반환해야 합니다.`, () => {
    expect(isPwValid('')).toBe(false);
  });

  describe('10자보다 길이가 짧은 경우 거짓을 반환해야 합니다.', () => {
    it(`영소문자 + 숫자 조합이지만 10자보다 길이가 짧을 경우 거짓을 반환해야 합니다.`, () => {
      expect(isPwValid('a1')).toBe(false);
    });
    it(`영대문자 + 숫자 조합이지만 10자보다 길이가 짧을 경우 거짓을 반환해야 합니다.`, () => {
      expect(isPwValid('A1')).toBe(false);
    });
    it(`특수문자 + 숫자 조합이지만 10자보다 길이가 짧을 경우 거짓을 반환해야 합니다.`, () => {
      expect(isPwValid('#1')).toBe(false);
    });
    it(`특수문자 + 영대문자 조합이지만 10자보다 길이가 짧을 경우 거짓을 반환해야 합니다.`, () => {
      expect(isPwValid('#A')).toBe(false);
    });
    it(`특수문자 + 영소문자 조합이지만 10자보다 길이가 짧을 경우 거짓을 반환해야 합니다.`, () => {
      expect(isPwValid('#a')).toBe(false);
    });
    it(`영대문자 + 영소문자 조합이지만 10자보다 길이가 짧을 경우 거짓을 반환해야 합니다.`, () => {
      expect(isPwValid('Aa')).toBe(false);
    });
  });

  describe('35자보다 길이가 길 경우 거짓을 반환해야 합니다.', () => {
    it(`영소문자 + 숫자 조합이지만 35자보다 길이가 길 경우 거짓을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'a'.repeat(35)}1`)).toBe(false);
    });
    it(`영대문자 + 숫자 조합이지만 35자보다 길이가 길 경우 거짓을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'A'.repeat(35)}1`)).toBe(false);
    });
    it(`특수문자 + 숫자 조합이지만 35자보다 길이가 길 경우 거짓을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'#'.repeat(35)}1`)).toBe(false);
    });
    it(`특수문자 + 영대문자 조합이지만 35자보다 길이가 길 경우 거짓을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'#'.repeat(35)}A`)).toBe(false);
    });
    it(`특수문자 + 영소문자 조합이지만 35자보다 길이가 길 경우 거짓을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'#'.repeat(35)}a`)).toBe(false);
    });
    it(`영대문자 + 영소문자 조합이지만 35자보다 길이가 길 경우 거짓을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'A'.repeat(35)}a`)).toBe(false);
    });
  });

  describe(`10자일 경우 참을 반환해야 합니다.`, () => {
    expect(isPwValid('123456789a')).toBe(true);
    it('영소문자 + 숫자 조합이고 10자일 경우 참을 반환해야 합니다.', () => {
      expect(isPwValid(`${'a'.repeat(9)}1`)).toBe(true);
    });
    it(`영대문자 + 숫자 조합이고 10자일 경우 참을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'A'.repeat(9)}1`)).toBe(true);
    });
    it(`특수문자 + 숫자 조합이고 10자일 경우 참을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'#'.repeat(9)}1`)).toBe(true);
    });
    it(`특수문자 + 영대문자 조합이고 10자일 경우 참을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'#'.repeat(9)}A`)).toBe(true);
    });
    it(`특수문자 + 영소문자 조합이고 10자일 경우 참을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'#'.repeat(9)}a`)).toBe(true);
    });
    it(`영대문자 + 영소문자 조합이고 10자일 경우 참을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'A'.repeat(9)}a`)).toBe(true);
    });
  });

  describe(`35자일 경우 참을 반환해야 합니다.`, () => {
    expect(isPwValid('123456789a')).toBe(true);
    it('영소문자 + 숫자 조합이고 35자일 경우 참을 반환해야 합니다.', () => {
      expect(isPwValid(`${'a'.repeat(34)}1`)).toBe(true);
    });
    it(`영대문자 + 숫자 조합이고 35자일 경우 참을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'A'.repeat(34)}1`)).toBe(true);
    });
    it(`특수문자 + 숫자 조합이고 35자일 경우 참을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'#'.repeat(34)}1`)).toBe(true);
    });
    it(`특수문자 + 영대문자 조합이고 35자일 경우 참을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'#'.repeat(34)}A`)).toBe(true);
    });
    it(`특수문자 + 영소문자 조합이고 35자일 경우 참을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'#'.repeat(34)}a`)).toBe(true);
    });
    it(`영대문자 + 영소문자 조합이고 35자일 경우 참을 반환해야 합니다.`, () => {
      expect(isPwValid(`${'A'.repeat(34)}a`)).toBe(true);
    });
  });

  describe('10 ~ 35자 사이면서 영대소문자, 특수문자, 숫자 중 2가지 이상 조합이면 참을 반환해야 합니다.', () => {
    it('10 ~ 35자 사이의 영대문자 + 영소문자 조합은 참을 반환해야 합니다. ', () => {
      expect(isPwValid('ABCabcABCa')).toBe(true);
      expect(isPwValid('abAbabABab')).toBe(true);
      expect(isPwValid('aaaBBBaaaB')).toBe(true);
    });
    it('10 ~ 35자 사이의 영대문자 + 숫자 조합은 참을 반환해야 합니다. ', () => {
      expect(isPwValid('ABC123ABC123')).toBe(true);
      expect(isPwValid('AB12AB12ABB')).toBe(true);
      expect(isPwValid('BBB111BBB111')).toBe(true);
    });
    it('10 ~ 35자 사이의 영대문자 + 특수문자 조합은 참을 반환해야 합니다. ', () => {
      expect(isPwValid('ABC!@$ABC!@$')).toBe(true);
      expect(isPwValid('AB!@AB!@AB!')).toBe(true);
      expect(isPwValid('BBB!@$BBB!@$')).toBe(true);
    });
    it('10 ~ 35자 사이의 영소문자 + 숫자 조합은 참을 반환해야 합니다. ', () => {
      expect(isPwValid('abc123abc123')).toBe(true);
      expect(isPwValid('ab12ab12abb')).toBe(true);
      expect(isPwValid('bbb111bbb111')).toBe(true);
    });
    it('10 ~ 35자 사이의 영소문자 + 특수문자 조합은 참을 반환해야 합니다. ', () => {
      expect(isPwValid('abc!@$abc!@$')).toBe(true);
      expect(isPwValid('ab!@ab!@ab!')).toBe(true);
      expect(isPwValid('bbb!@$bbb!@$')).toBe(true);
    });
    it('10 ~ 35자 사이의 숫자 + 특수문자 조합은 참을 반환해야 합니다. ', () => {
      expect(isPwValid('123!@$123!@$')).toBe(true);
      expect(isPwValid('12!@12!@12!')).toBe(true);
      expect(isPwValid('222!@$222!@$')).toBe(true);
    });
  });

  describe('10 ~ 35자 사이이지만 영대소문자, 특수문자, 숫자를 조합하지 않을 경우 거짓을 반환해야 합니다.', () => {
    it('10 ~ 35자 사이이지만 영대문자만 사용할 경우 거짓을 반환해야 합니다.', () => {
      expect(isPwValid('ABCDEFGHIJ')).toBe(false);
      expect(isPwValid('JIHGFEDCBA')).toBe(false);
      expect(isPwValid('WEFWEFEWFF')).toBe(false);
    });
    it('10 ~ 35자 사이이지만 영소문자만 사용할 경우 거짓을 반환해야 합니다.', () => {
      expect(isPwValid('abcdefghij')).toBe(false);
      expect(isPwValid('jihgfedcba')).toBe(false);
      expect(isPwValid('wefwefewfw')).toBe(false);
    });
    it('10 ~ 35자 사이이지만 숫자만 사용할 경우 거짓을 반환해야 합니다.', () => {
      expect(isPwValid('1234567890')).toBe(false);
      expect(isPwValid('0987654321')).toBe(false);
      expect(isPwValid('1231231313')).toBe(false);
    });
    it('10 ~ 35자 사이이지만 특수문자만 사용할 경우 거짓을 반환해야 합니다.', () => {
      expect(isPwValid('^%$%^&*(*^')).toBe(false);
      expect(isPwValid(')(*&**&^&*')).toBe(false);
      expect(isPwValid('#@$#$%##%#')).toBe(false);
    });
  });
});
