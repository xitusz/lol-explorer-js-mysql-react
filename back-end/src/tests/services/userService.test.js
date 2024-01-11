/* eslint-disable no-undef */
const { expect } = require("chai");
const sinon = require("sinon");
const userService = require("../../services/userService");
const { User } = require("../../database/models");

describe("User Service", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("getProfileInfo", () => {
    it("should get profile info", async () => {
      const user = { name: "User", email: "user@example.com" };
      const userId = 1;

      const getProfileInfoStub = sinon.stub(User, "findOne").resolves(user);

      const result = await userService.getProfileInfo(userId);

      expect(result).to.deep.equal(user);
      expect(getProfileInfoStub.calledOnce).to.be.true;
      expect(
        getProfileInfoStub.calledWith({
          where: { id: userId },
          attributes: ["name", "email"],
        })
      ).to.be.true;
    });

    it("should handle error user not found", async () => {
      const userId = 2;

      const getProfileInfoStub = sinon.stub(User, "findOne").resolves(null);

      try {
        await userService.getProfileInfo(userId);
      } catch (err) {
        expect(err.message).to.equal(
          "Erro ao buscar usuário: Error: Usuário não encontrado"
        );
      }

      expect(getProfileInfoStub.calledOnce).to.be.true;
      expect(
        getProfileInfoStub.calledWith({
          where: { id: userId },
          attributes: ["name", "email"],
        })
      ).to.be.true;
    });

    it("should handle error get profile info", async () => {
      const userId = 1;

      const getProfileInfoStub = sinon
        .stub(User, "findOne")
        .rejects(new Error());

      try {
        await userService.getProfileInfo(userId);
      } catch (err) {
        expect(err.message).to.equal(`Erro ao buscar usuário: Error`);
      }

      expect(getProfileInfoStub.calledOnce).to.be.true;
      expect(
        getProfileInfoStub.calledWith({
          where: { id: userId },
          attributes: ["name", "email"],
        })
      ).to.be.true;
    });
  });
});
