/* eslint-disable no-undef */
const { expect } = require("chai");
const { hash } = require("../../utils/hash");
const sinon = require("sinon");
const bcrypt = require("bcrypt");

describe("Hash Util", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("hash", () => {
    it("should hash a string", async () => {
      const bcryptStub = sinon.stub(bcrypt, "hash").resolves("hashedPassword");

      const hashedPassword = await hash("123456");

      expect(bcryptStub.calledWith("123456", 10)).to.be.true;
      expect(hashedPassword).to.equal("hashedPassword");
    });

    it("should handle error hashing password", async () => {
      sinon.stub(bcrypt, "hash").rejects(new Error());

      try {
        await hash("123456");
      } catch (err) {
        expect(err.message).to.equal("Erro ao fazer o hashing da senha: Error");
      }
    });
  });
});
