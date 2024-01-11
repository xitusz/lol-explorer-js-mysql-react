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
        expect(err.message).to.equal("Erro ao buscar usuário: Error");
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

  describe("updateName", () => {
    it("should update user name", async () => {
      const updateNameStub = sinon.stub(User, "update").resolves();
      const userId = 1;

      const result = await userService.updateName(userId, "New Name");

      expect(result).to.equal("Nome atualizado com sucesso!");
      expect(updateNameStub.calledOnce).to.be.true;
      expect(
        updateNameStub.calledWith(
          { name: "New Name" },
          { where: { id: userId } }
        )
      ).to.be.true;
    });

    it("should handle error update user name", async () => {
      const userId = 1;

      const updateNameStub = sinon.stub(User, "update").rejects(new Error());

      try {
        await userService.updateName(userId, "New Name");
      } catch (err) {
        expect(err.message).to.equal("Erro ao atualizar nome: Error");
      }

      expect(updateNameStub.calledOnce).to.be.true;
      expect(
        updateNameStub.calledWith(
          { name: "New Name" },
          { where: { id: userId } }
        )
      ).to.be.true;
    });
  });
});
