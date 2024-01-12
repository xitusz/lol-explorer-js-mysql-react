/* eslint-disable no-undef */
const { expect } = require("chai");
const sinon = require("sinon");
const userService = require("../../services/userService");
const { User } = require("../../database/models");
const { hash } = require("../../utils/hash");
const bcrypt = require("bcrypt");

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

  describe("updateEmail", () => {
    it("should update user email", async () => {
      const updateEmailStub = sinon.stub(User, "update").resolves();
      const userId = 1;

      const result = await userService.updateEmail(userId, "user2@example.com");

      expect(result).to.equal("Email atualizado com sucesso!");
      expect(updateEmailStub.calledOnce).to.be.true;
      expect(
        updateEmailStub.calledWith(
          { email: "user2@example.com" },
          { where: { id: userId } }
        )
      ).to.be.true;
    });

    it("should handle error update user email", async () => {
      const userId = 1;

      const updateEmailStub = sinon.stub(User, "update").rejects(new Error());

      try {
        await userService.updateEmail(userId, "user2@example.com");
      } catch (err) {
        expect(err.message).to.equal("Erro ao atualizar email: Error");
      }

      expect(updateEmailStub.calledOnce).to.be.true;
      expect(
        updateEmailStub.calledWith(
          { email: "user2@example.com" },
          { where: { id: userId } }
        )
      ).to.be.true;
    });
  });

  describe("updatePassword", () => {
    it("should update user password", async () => {
      sinon.stub(bcrypt, "hash").resolves("hashedPassword");
      const updatePasswordStub = sinon.stub(User, "update").resolves();

      const userId = 1;
      const newPassword = "123456";

      const hashedPassword = await hash(newPassword);
      const result = await userService.updatePassword(userId, newPassword);

      expect(result).to.equal("Senha atualizada com sucesso!");
      expect(updatePasswordStub.calledOnce).to.be.true;
      expect(
        updatePasswordStub.calledWith(
          { password: hashedPassword },
          { where: { id: userId } }
        )
      ).to.be.true;
    });

    it("should handle error update user password", async () => {
      sinon.stub(bcrypt, "hash").resolves("hashedPassword");
      const updatePasswordStub = sinon
        .stub(User, "update")
        .rejects(new Error());

      const userId = 1;
      const newPassword = "123456";

      const hashedPassword = await hash(newPassword);

      try {
        await userService.updatePassword(userId, newPassword);
      } catch (err) {
        expect(err.message).to.equal("Erro ao atualizar senha: Error");
      }

      expect(updatePasswordStub.calledOnce).to.be.true;
      expect(
        updatePasswordStub.calledWith(
          { password: hashedPassword },
          { where: { id: userId } }
        )
      ).to.be.true;
    });
  });
});
