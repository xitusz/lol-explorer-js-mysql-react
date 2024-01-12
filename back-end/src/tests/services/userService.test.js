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
      const userId = 1;
      const user = { name: "User", email: "user@example.com" };

      const findOneStub = sinon.stub(User, "findOne").resolves(user);

      const result = await userService.getProfileInfo(userId);

      expect(result).to.deep.equal(user);
      expect(findOneStub.calledOnce).to.be.true;
      expect(
        findOneStub.calledWith({
          where: { id: userId },
          attributes: ["name", "email"],
        })
      ).to.be.true;
    });

    it("should handle error user not found", async () => {
      const userId = 2;

      const findOneStub = sinon.stub(User, "findOne").resolves(null);

      try {
        await userService.getProfileInfo(userId);
      } catch (err) {
        expect(err.message).to.equal(
          "Erro ao buscar usuário: Error: Usuário não encontrado"
        );
      }

      expect(findOneStub.calledOnce).to.be.true;
      expect(
        findOneStub.calledWith({
          where: { id: userId },
          attributes: ["name", "email"],
        })
      ).to.be.true;
    });

    it("should handle error get profile info", async () => {
      const userId = 1;

      const findOneStub = sinon.stub(User, "findOne").rejects(new Error());

      try {
        await userService.getProfileInfo(userId);
      } catch (err) {
        expect(err.message).to.equal("Erro ao buscar usuário: Error");
      }

      expect(findOneStub.calledOnce).to.be.true;
      expect(
        findOneStub.calledWith({
          where: { id: userId },
          attributes: ["name", "email"],
        })
      ).to.be.true;
    });
  });

  describe("updateName", () => {
    it("should update user name", async () => {
      const userId = 1;
      const newName = "New Name";

      const updateStub = sinon.stub(User, "update").resolves();

      const result = await userService.updateName(userId, newName);

      expect(result).to.equal("Nome atualizado com sucesso!");
      expect(updateStub.calledOnce).to.be.true;
      expect(
        updateStub.calledWith({ name: newName }, { where: { id: userId } })
      ).to.be.true;
    });

    it("should handle error update user name", async () => {
      const userId = 1;
      const newName = "New Name";

      const updateStub = sinon.stub(User, "update").rejects(new Error());

      try {
        await userService.updateName(userId, newName);
      } catch (err) {
        expect(err.message).to.equal("Erro ao atualizar nome: Error");
      }

      expect(updateStub.calledOnce).to.be.true;
      expect(
        updateStub.calledWith({ name: newName }, { where: { id: userId } })
      ).to.be.true;
    });
  });

  describe("updateEmail", () => {
    it("should update user email", async () => {
      const userId = 1;
      const newEmail = "user2@example.com";

      const updateStub = sinon.stub(User, "update").resolves();

      const result = await userService.updateEmail(userId, newEmail);

      expect(result).to.equal("Email atualizado com sucesso!");
      expect(updateStub.calledOnce).to.be.true;
      expect(
        updateStub.calledWith({ email: newEmail }, { where: { id: userId } })
      ).to.be.true;
    });

    it("should handle error update user email", async () => {
      const userId = 1;
      const newEmail = "user2@example.com";

      const updateStub = sinon.stub(User, "update").rejects(new Error());

      try {
        await userService.updateEmail(userId, newEmail);
      } catch (err) {
        expect(err.message).to.equal("Erro ao atualizar email: Error");
      }

      expect(updateStub.calledOnce).to.be.true;
      expect(
        updateStub.calledWith({ email: newEmail }, { where: { id: userId } })
      ).to.be.true;
    });
  });

  describe("updatePassword", () => {
    it("should update user password", async () => {
      const userId = 1;
      const newPassword = "123456";

      sinon.stub(bcrypt, "hash").resolves("hashedPassword");
      const updateStub = sinon.stub(User, "update").resolves();

      const hashedPassword = await hash(newPassword);
      const result = await userService.updatePassword(userId, newPassword);

      expect(result).to.equal("Senha atualizada com sucesso!");
      expect(updateStub.calledOnce).to.be.true;
      expect(
        updateStub.calledWith(
          { password: hashedPassword },
          { where: { id: userId } }
        )
      ).to.be.true;
    });

    it("should handle error update user password", async () => {
      const userId = 1;
      const newPassword = "123456";

      sinon.stub(bcrypt, "hash").resolves("hashedPassword");
      const updateStub = sinon.stub(User, "update").rejects(new Error());

      const hashedPassword = await hash(newPassword);

      try {
        await userService.updatePassword(userId, newPassword);
      } catch (err) {
        expect(err.message).to.equal("Erro ao atualizar senha: Error");
      }

      expect(updateStub.calledOnce).to.be.true;
      expect(
        updateStub.calledWith(
          { password: hashedPassword },
          { where: { id: userId } }
        )
      ).to.be.true;
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      const userId = 1;

      const findOneStub = sinon.stub(User, "findOne").resolves({ id: userId });
      const destroyStub = sinon.stub(User, "destroy").resolves();

      const result = await userService.deleteUser(userId);

      expect(result).to.equal("Usuário excluído com sucesso!");
      expect(findOneStub.calledOnce).to.be.true;
      expect(
        findOneStub.calledWith({
          where: { id: userId },
        })
      ).to.be.true;
      expect(destroyStub.calledOnce).to.be.true;
      expect(
        destroyStub.calledWith({
          where: { id: userId },
        })
      ).to.be.true;
    });

    it("should handle error user not found", async () => {
      const userId = 2;

      const findOneStub = sinon.stub(User, "findOne").resolves(null);

      try {
        await userService.deleteUser(userId);
      } catch (err) {
        expect(err.message).to.equal(
          "Erro ao deletar usuário: Error: Usuário não encontrado"
        );
      }

      expect(findOneStub.calledOnce).to.be.true;
      expect(
        findOneStub.calledWith({
          where: { id: userId },
        })
      ).to.be.true;
    });

    it("should handle error delete a user", async () => {
      const userId = 1;

      const findOneStub = sinon.stub(User, "findOne").resolves({ id: userId });
      const destroyStub = sinon.stub(User, "destroy").resolves();

      try {
        await userService.deleteUser(userId);
      } catch (err) {
        expect(err.message).to.equal("Erro ao deletar usuário: Error");
      }

      expect(findOneStub.calledOnce).to.be.true;
      expect(
        findOneStub.calledWith({
          where: { id: userId },
        })
      ).to.be.true;
      expect(destroyStub.calledOnce).to.be.true;
      expect(
        destroyStub.calledWith({
          where: { id: userId },
        })
      ).to.be.true;
    });
  });
});
