/* eslint-disable no-undef */
const { expect } = require("chai");
const { hash, verify } = require("../../utils/hash");

describe("Hash Util", () => {
  it("should hash a string", () => {
    const hashedString = hash("123456");

    expect(hashedString).to.be.a("string");
  });

  it("should return true for a valid string", () => {
    const originalString = "123456";
    const hashedString = hash(originalString);

    const isValid = verify(originalString, hashedString);

    expect(isValid).to.be.true;
  });

  it("should return false for an invalid string", () => {
    const originalString = "123456";
    const hashedString = hash(originalString);
    const invalidString = "invalid";

    const isValid = verify(invalidString, hashedString);

    expect(isValid).to.be.false;
  });
});
