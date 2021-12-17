# @telbby/validation

<br />
<p align="center">
  <img src="https://user-images.githubusercontent.com/22045163/141472494-00de9d64-1f05-4b1c-bb29-3f688368136c.png" alt="logo" width="150px" />
</p>

This is **Validation Module** of **Telbby**, a service that can be introduced into my project to exchange feedback with various users.

## Usage

- [ID and PW Rules](#id-and-pw-rules)
- [Validation Common Utils](#validation-common-utils)
- [Utils to Validate ID & PW](#utils-to-validate-id--pw)
- [Constants for ID & PW](#constants-for-id--pw)

### ID and PW Rules

- ID must be between 4 and 30 characters long and can only use uppercase and lowercase letters and numbers, and must start with an English letter.
- PW must be between 10 and 35 characters and must be a combination of at least two of uppercase and lowercase letters, numbers, and special characters.

### Validation Common Utils

- `isStartWithEng(s: string): boolean`
  - Returns true if the given string begins with an alphabetic character.
- `isOnlyUseEngAndNumbers(s: string): boolean`
  - Returns true if the given string consisting of only alphanumeric characters.
- `isHasUpperEng(s: string): boolean`
  - Returns true if the given string contains uppercase letters.
- `isHasLowerEng(s: string): boolean`
  - Returns true if the given string contains lowercase letters.
- `isHasSpecialChar(s: string): boolean`
  - Returns true if the given string contains special characters.
- `isHasNumber(s: string): boolean`
  - Returns true if the given string contains a number.

### Utils to Validate ID & PW

- `isIdLengthValid(id: string): boolean`
  - Returns true if the length of the given id is valid
- `isIdValid(id: string): boolean`
  - Returns true if the given id is valid
- `isPwCombinationValid(pw: string): boolean`
  - Returns true if the combination of the given pw is valid
- `isPwLengthValid(pw: string): boolean`
  - Returns true if the length of the given pw is valid
- `isPwValid(pw: string): boolean`
  - Returns true if the given pw is valid
- `idValidator(id: string): readonly [boolean, string]`
  - If the id is invalid, it returns false and a warning string. Returns an empty string if the id is valid.
- `pwValidator(pw: string): readonly [boolean, string]`
  - If the pw is invalid, it returns false and a warning string. Returns an empty string if the pw is valid.

### Constants for ID & PW

- `USER_ID_MIN_LENGTH`
  - Minimum length of user ID
- `USER_ID_MAX_LENGTH`
  - Maximum length of user ID
- `USER_PW_MIN_LENGTH`
  - Minimum length of user PW
- `USER_PW_MAX_LENGTH`
  - Maximum length of user PW
- Warning Messages
  - `WARNING_ID_EMPTY`
  - `WARNING_ID_ALL`
  - `WARNING_ID_LENGTH`
  - `WARNING_ID_START`
  - `WARNING_ID_LETTERS`
  - `WARNING_PW_EMPTY`
  - `WARNING_PW_ALL`
  - `WARNING_PW_LENGTH`
  - `WARNING_PW_COMBINATION`

## License

This package is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
