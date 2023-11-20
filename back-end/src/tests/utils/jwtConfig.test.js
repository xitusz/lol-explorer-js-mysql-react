/* eslint-disable no-undef */
const { expect } = require("chai");
const { sign, verifyToken } = require("../../utils/jwtConfig");

describe("JWT Util", () => {
  it("should sign and verify a token", () => {
    const payload = { id: 1, name: "user", email: "user1@example.com" };
    const token = sign(payload);
    const decoded = verifyToken(token);

    expect(decoded).to.have.property("id").to.equal(1);
    expect(decoded).to.have.property("name").to.equal("user");
    expect(decoded).to.have.property("email").to.equal("user1@example.com");
  });
});
