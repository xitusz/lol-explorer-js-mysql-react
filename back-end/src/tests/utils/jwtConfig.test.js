/* eslint-disable no-undef */
const { expect } = require("chai");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const { sign } = require("../../utils/jwtConfig");

describe("JWT Util", () => {
  const payload = { id: 1, name: "user", email: "user@example.com" };

  afterEach(() => {
    sinon.restore();
  });

  describe("sign", () => {
    it("should sign a token", () => {
      const signStub = sinon.stub(jwt, "sign").returns("token");

      const token = sign(payload);

      expect(signStub.calledWith(payload, sinon.match.any, sinon.match.any)).to
        .be.true;
      expect(token).to.equal("token");
    });

    it("should handle error sign token", () => {
      sinon.stub(jwt, "sign").throws(new Error());

      try {
        sign(payload);
      } catch (err) {
        expect(err.message).to.equal(`Erro ao assinar o token JWT: Error`);
      }
    });
  });
});
