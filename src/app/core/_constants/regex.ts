export abstract class RegexValidators {
  static readonly phoneNumber: string = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$';
  static readonly email: string = '^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
  static readonly number: string = '^[0-9]*$';
  static readonly decimalMax100: string = '^\\d*\\.?\\d*$';
  static readonly onlyNumberAndLetters: string = '[a-zA-Z0-9]+';
}
