import {
  AGE_ERROR,
  EMAIL_ERROR,
  NAME_ERROR,
  PASSWORD_ERROR_FIRST,
  PASSWORD_ERROR_SECOND,
  REG_ERROR,
  REG_OK,
  SURNAME_ERROR,
} from "../support/errorMessage";

export class RegistrationForm {
  constructor() {}

  public setName(name: string) {
    if (name.length > 3) {
      return name;
    } else {
      throw Error(NAME_ERROR);
    }
  }

  public setSurname(surname: string) {
    if (surname.length > 3) {
      return surname;
    } else {
      throw Error(SURNAME_ERROR);
    }
  }

  public setEmail(email: string) {
    const regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (regExp.test(email)) {
      return email;
    } else {
      throw Error(EMAIL_ERROR);
    }
  }

  public verifyPassword(password: string, confirmPassword: string) {
    if (password.length >= 6 && confirmPassword.length >= 6) {
      if (password === confirmPassword) {
        return password;
      } else {
        throw Error(PASSWORD_ERROR_SECOND);
      }
    } else {
      throw Error(PASSWORD_ERROR_FIRST);
    }
  }

  public setAge(age: Number) {
    if (age >= 18) {
      return age;
    } else {
      throw Error(AGE_ERROR);
    }
  }

  public registration(
    name: string,
    surname: string,
    email: string,
    password: string,
    confirmPassword: string,
    age: Number
  ) {
    if (
      this.setName(name) &&
      this.setSurname(surname) &&
      this.setEmail(email) &&
      this.verifyPassword(password, confirmPassword) &&
      this.setAge(age)
    ) {
      return REG_OK;
    } else {
      throw Error(REG_ERROR);
    }
  }
}
