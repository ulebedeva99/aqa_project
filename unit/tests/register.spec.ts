import assert from "assert";
import { RegistrationForm } from "../src/registrationForm";
import { expect } from "chai";
import {
  VALID_AGE,
  VALID_EMAIL,
  INVALID_CONFIRM_PASSWORD,
  NAME,
  SURNAME,
  VALID_CONFIRM_PASSWORD,
  VALID_PASSWORD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  INVALID_AGE,
} from "../support/testValues";
import {
  AGE_ERROR,
  EMAIL_ERROR,
  PASSWORD_ERROR_FIRST,
  PASSWORD_ERROR_SECOND,
  REG_OK,
} from "../support/errorMessage";

let register: any;

describe("Test for registration class methods", () => {
  before("Initialize class instance", () => {
    register = new RegistrationForm();
  });
  it("The entered name should be valid", () => {
    assert.ok(register.setName(NAME));
  });

  it("The entered surname should be valid ", () => {
    assert.ok(register.setSurname(SURNAME));
  });

  it("Should no errors after validation entered password and confirm password", () => {
    assert.notEqual(
      register.verifyPassword(VALID_PASSWORD, VALID_CONFIRM_PASSWORD),
      PASSWORD_ERROR_FIRST
    );
  });

  it("The entered password and confirm password should be match", () => {
    expect(() =>
      register.verifyPassword(VALID_CONFIRM_PASSWORD, INVALID_CONFIRM_PASSWORD)
    ).to.throws(PASSWORD_ERROR_SECOND);
  });

  it("The entered age should be valid", () => {
    assert.ok(register.setAge(VALID_AGE));
    assert.equal(register.setAge(VALID_AGE), VALID_AGE);
  });

  it("Should no errors after validation email address", () => {
    assert.notEqual(register.setEmail(VALID_EMAIL), EMAIL_ERROR);
  });

  it("Registration should be successfully with entered valid all data", () => {
    assert.equal(
      register.registration(
        NAME,
        SURNAME,
        VALID_EMAIL,
        VALID_PASSWORD,
        VALID_CONFIRM_PASSWORD,
        VALID_AGE
      ),
      REG_OK
    );
  });

  it("Registration should be failed with entered ivalid email", () => {
    expect(() =>
      register.registration(
        NAME,
        SURNAME,
        INVALID_EMAIL,
        VALID_PASSWORD,
        VALID_CONFIRM_PASSWORD,
        VALID_AGE
      )
    ).to.throw(EMAIL_ERROR);
  });

  it("Registration should be failed with entered ivalid password", () => {
    expect(() =>
      register.registration(
        NAME,
        SURNAME,
        VALID_EMAIL,
        INVALID_PASSWORD,
        VALID_CONFIRM_PASSWORD,
        VALID_AGE
      )
    ).to.throw(PASSWORD_ERROR_FIRST);
  });

  it("Registration should be failed with entered age less that 18", () => {
    expect(() =>
      register.registration(
        NAME,
        SURNAME,
        VALID_EMAIL,
        VALID_PASSWORD,
        VALID_CONFIRM_PASSWORD,
        INVALID_AGE
      )
    ).to.throw(AGE_ERROR);
  });

  after("Delete class instance", () => {
    register = null;
  });
});
