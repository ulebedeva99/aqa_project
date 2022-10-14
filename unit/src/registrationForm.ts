export class RegistrationForm {
  constructor() {}

  public setName(name: string) {
    if (name.length > 3) {
      return name;
    } else {
      throw Error("Name is too short or empty");
    }
  }

  public setSurname(surname: string) {
    if (surname.length > 3) {
      return surname;
    } else {
      throw Error("Surname is too short or empty");
    }
  }

  public setEmail(email: string) {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email)) {
      return email;
    } else {
      throw Error("Email is invalid");
    }
  }

  public verifyPassword(password: string, confirmPassword: string) {
    if (password.length >= 6 && confirmPassword.length >= 6) {
      if (password === confirmPassword) {
        return password;
      } else {
        throw Error("Password and Confirm password values are not match");
      }
    } else {
      throw Error("Password or Confirm password values are too short");
    }
  }
  public setAge(age: Number) {
    if (age >= 18) {
      return age;
    } else {
      throw Error("Age is less than 18");
    }
  }
  public registration(
    name: string,
    surname: string,
    email: string,
    password: string,
    confirmPassword: string,
    age:Number
  ) {
    if (
      this.setName(name) &&
      this.setSurname(surname) &&
      this.setEmail(email) &&
      this.verifyPassword(password, confirmPassword) && this.setAge(age)
    ) {
      return "Registration is successfully.";
    } else {
      throw Error("Registration is failed");
    }
  }
}
