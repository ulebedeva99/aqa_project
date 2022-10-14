import assert from "assert";
import { RegistrationForm } from "../src/registrationForm";
import { expect } from "chai";

let register: any;

describe("Test for registration class methods", () => {
  before("Initialize class instance", () => {
    register = new RegistrationForm();
  });
  it("The entered name should be valid", () => {
    assert.ok(register.setName("Ulyana"));
  });

  it("The entered surname should be valid ", () => {
    assert.ok(register.setSurname("Lebedeva"));
  });

  it("Should no errors after validation entered password and confirm password", () => {
    assert.notEqual(
      register.verifyPassword("1q2w3e4r", "1q2w3e4r"),
      "Password or Confirm password values are too short"
    );
  });

  it("The entered password and confirm password should be match", () => {
    expect(() => register.verifyPassword("1q2w3e4r", "1q2w3e4r0")).to.throws(
      "Password and Confirm password values are not match"
    );
  });

  it("The entered age should be valid", () => {
    assert.ok(register.setAge(33));
    assert.equal(register.setAge(33), 33);
  });

  it("Should no errors after validation email address", () => {
    assert.notEqual(register.setEmail("test@test.ru"), "Email is invalid");
  });

  it("Registration should be successfully with entered valid all data", () => {
    assert.equal(
      register.registration(
        "Ulyana",
        "Lebedeva",
        "ulyana@mail.ru",
        "123456",
        "123456",
        21
      ),
      "Registration is successfully."
    );
  });

  it("Registration should be failed with entered ivalid email", () => {
    expect(() =>
      register.registration(
        "Ulyana",
        "Lebedeva",
        "ulyana@mail.",
        "123456",
        "123456",
        21
      )
    ).to.throw("Email is invalid");
  });

  it("Registration should be failed with entered ivalid password", () => {
    expect(() =>
      register.registration(
        "Ulyana",
        "Lebedeva",
        "ulyana@mail.ru",
        "1234",
        "123456",
        21
      )
    ).to.throw("Password or Confirm password values are too short");
  });

  it("Registration should be failed with entered age less that 18", () => {
    expect(() =>
      register.registration(
        "Ulyana",
        "Lebedeva",
        "ulyana@mail.ru",
        "123456",
        "123456",
        17
      )
    ).to.throw("Age is less than 18");
  });

  after("Delete class instance", () => {
    register = null;
  });
});
