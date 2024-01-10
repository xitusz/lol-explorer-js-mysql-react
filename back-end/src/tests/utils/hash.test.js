/* eslint-disable no-undef */
const { expect } = require("chai");
const { hash, verify } = require("../../utils/hash");
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

  describe("verify", () => {
    it("should return true for a valid password", async () => {
      const bcryptStub = sinon.stub(bcrypt, "compare").resolves(true);

      const password = "123456";
      const hashedPassword = "hashedPassword";
      const isMatch = await verify(password, hashedPassword);

      expect(bcryptStub.calledWith(password, hashedPassword)).to.be.true;
      expect(isMatch).to.be.true;
    });

    it("should return false for an invalid password", async () => {
      const bcryptStub = sinon.stub(bcrypt, "compare").resolves(false);

      const password = "invalid";
      const hashedPassword = "hashedPassword";
      const isMatch = await verify(password, hashedPassword);

      expect(bcryptStub.calledWith(password, hashedPassword)).to.be.true;
      expect(isMatch).to.be.false;
    });

    it("should handle error verifying password", async () => {
      sinon.stub(bcrypt, "compare").rejects(new Error());

      const password = "123456";
      const hashedPassword = "hashedPassword";

      try {
        await verify(password, hashedPassword);
      } catch (err) {
        expect(err.message).to.equal("Erro ao verificar a senha: Error");
      }
    });
  });
});
