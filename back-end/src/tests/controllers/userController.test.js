/* eslint-disable no-undef */
const { expect } = require("chai");
const sinon = require("sinon");
const userController = require("../../controllers/userController");
const userService = require("../../services/userService");

describe("User Controller", () => {
  createReqResNext = () => {
    const req = { user: { id: 1 } };
    const res = {};
    const next = sinon.spy();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    return { req, res, next };
  };

  afterEach(() => {
    sinon.restore();
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const { req, res, next } = createReqResNext();

      req.body = {
        name: "user",
        email: "user@example.com",
        password: "123456",
      };

      const createStub = sinon
        .stub(userService, "create")
        .resolves("Usuário criado");

      await userController.create(req, res, next);

      const { name, email, password } = req.body;

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: "Usuário criado" })).to.be.true;
      expect(next.notCalled).to.be.true;
      expect(createStub.calledOnce).to.be.true;
      expect(createStub.calledWith(name, email, password)).to.be.true;
    });

    it("should handle error create a new user", async () => {
      const { req, res, next } = createReqResNext();

      req.body = {
        name: "user",
        email: "user@example.com",
        password: "123456",
      };

      sinon
        .stub(userService, "create")
        .rejects(new Error("Erro ao criar usuário"));

      await userController.create(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(
        next.calledWithMatch(
          sinon.match
            .instanceOf(Error)
            .and(sinon.match.has("message", "Erro ao criar usuário"))
        )
      ).to.be.true;
    });
  });

  describe("login", () => {
    it("should log in a user", async () => {
      const { req, res, next } = createReqResNext();

      req.body = {
        email: "user@example.com",
        password: "123456",
      };

      const loginStub = sinon
        .stub(userService, "login")
        .resolves({ user: "userData", token: "token" });

      await userController.login(req, res, next);

      const { email, password } = req.body;

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ user: "userData", token: "token" })).to.be
        .true;
      expect(next.notCalled).to.be.true;
      expect(loginStub.calledOnce).to.be.true;
      expect(loginStub.calledWith(email, password)).to.be.true;
    });

    it("should handle error log in a user", async () => {
      const { req, res, next } = createReqResNext();

      req.body = {
        name: "user",
        email: "user@example.com",
        password: "123456",
      };

      sinon
        .stub(userService, "login")
        .rejects(new Error("Erro ao realizar login do usuário"));

      await userController.login(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(
        next.calledWithMatch(
          sinon.match
            .instanceOf(Error)
            .and(
              sinon.match.has("message", "Erro ao realizar login do usuário")
            )
        )
      ).to.be.true;
    });
  });

  describe("getProfileInfo", () => {
    it("should get profile info", async () => {
      const { req, res, next } = createReqResNext();

      const getProfileInfoStub = sinon
        .stub(userService, "getProfileInfo")
        .resolves({ name: "User", email: "user@example.com" });

      await userController.getProfileInfo(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ name: "User", email: "user@example.com" }))
        .to.be.true;
      expect(next.notCalled).to.be.true;
      expect(getProfileInfoStub.calledOnce).to.be.true;
      expect(getProfileInfoStub.calledWith(req.user.id)).to.be.true;
    });

    it("should handle error get profile info", async () => {
      const { req, res, next } = createReqResNext();

      sinon
        .stub(userService, "getProfileInfo")
        .rejects(new Error("Erro ao buscar usuário"));

      await userController.getProfileInfo(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(
        next.calledWithMatch(
          sinon.match
            .instanceOf(Error)
            .and(sinon.match.has("message", "Erro ao buscar usuário"))
        )
      ).to.be.true;
    });
  });

  describe("updateName", () => {
    it("should update user name", async () => {
      const { req, res, next } = createReqResNext();

      req.body = {
        newName: "New User",
      };

      const updateNameStub = sinon
        .stub(userService, "updateName")
        .resolves("Nome atualizado com sucesso!");

      await userController.updateName(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: "Nome atualizado com sucesso!" }))
        .to.be.true;
      expect(next.notCalled).to.be.true;
      expect(updateNameStub.calledOnce).to.be.true;
      expect(updateNameStub.calledWith(req.user.id, req.body.newName)).to.be
        .true;
    });

    it("should handle error update user name", async () => {
      const { req, res, next } = createReqResNext();

      req.body = {
        newName: "New User",
      };

      sinon
        .stub(userService, "updateName")
        .rejects(new Error("Erro ao atualizar nome"));

      await userController.updateName(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(
        next.calledWithMatch(
          sinon.match
            .instanceOf(Error)
            .and(sinon.match.has("message", "Erro ao atualizar nome"))
        )
      ).to.be.true;
    });
  });

  describe("updateEmail", () => {
    it("should update user email", async () => {
      const { req, res, next } = createReqResNext();

      req.body = {
        newEmail: "newuser@example.com",
      };

      const updateEmailStub = sinon
        .stub(userService, "updateEmail")
        .resolves("Email atualizado com sucesso!");

      await userController.updateEmail(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: "Email atualizado com sucesso!" }))
        .to.be.true;
      expect(next.notCalled).to.be.true;
      expect(updateEmailStub.calledOnce).to.be.true;
      expect(updateEmailStub.calledWith(req.user.id, req.body.newEmail)).to.be
        .true;
    });

    it("should handle error update user email", async () => {
      const { req, res, next } = createReqResNext();

      req.body = {
        newEmail: "newuser@example.com",
      };

      sinon
        .stub(userService, "updateEmail")
        .rejects(new Error("Erro ao atualizar email"));

      await userController.updateEmail(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(
        next.calledWithMatch(
          sinon.match
            .instanceOf(Error)
            .and(sinon.match.has("message", "Erro ao atualizar email"))
        )
      ).to.be.true;
    });
  });

  describe("updatePassword", () => {
    it("should update user password", async () => {
      const { req, res, next } = createReqResNext();

      req.body = {
        newPassword: "654321",
      };

      const updatePasswordStub = sinon
        .stub(userService, "updatePassword")
        .resolves("Senha atualizada com sucesso!");

      await userController.updatePassword(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: "Senha atualizada com sucesso!" }))
        .to.be.true;
      expect(next.notCalled).to.be.true;
      expect(updatePasswordStub.calledOnce).to.be.true;
      expect(updatePasswordStub.calledWith(req.user.id, req.body.newPassword))
        .to.be.true;
    });

    it("should handle error update user password", async () => {
      const { req, res, next } = createReqResNext();

      req.body = {
        newPassword: "654321",
      };

      sinon
        .stub(userService, "updatePassword")
        .rejects(new Error("Erro ao atualizar senha"));

      await userController.updatePassword(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(
        next.calledWithMatch(
          sinon.match
            .instanceOf(Error)
            .and(sinon.match.has("message", "Erro ao atualizar senha"))
        )
      ).to.be.true;
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      const { req, res, next } = createReqResNext();

      const deleteUserStub = sinon
        .stub(userService, "deleteUser")
        .resolves("Usuário excluído com sucesso!");

      await userController.deleteUser(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: "Usuário excluído com sucesso!" }))
        .to.be.true;
      expect(next.notCalled).to.be.true;
      expect(deleteUserStub.calledOnce).to.be.true;
      expect(deleteUserStub.calledWith(req.user.id)).to.be.true;
    });

    it("should handle error delete a user", async () => {
      const { req, res, next } = createReqResNext();

      sinon
        .stub(userService, "deleteUser")
        .rejects(new Error("Erro ao deletar usuário"));

      await userController.deleteUser(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(
        next.calledWithMatch(
          sinon.match
            .instanceOf(Error)
            .and(sinon.match.has("message", "Erro ao deletar usuário"))
        )
      ).to.be.true;
    });
  });

  describe("validateEmail", () => {
    it("should validate user email", async () => {
      const { req, res, next } = createReqResNext();

      req.body = {
        newEmail: "user@example.com",
      };

      const validateEmailStub = sinon
        .stub(userService, "validateEmail")
        .resolves(true);

      await userController.validateEmail(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(true)).to.be.true;
      expect(next.notCalled).to.be.true;
      expect(validateEmailStub.calledOnce).to.be.true;
      expect(validateEmailStub.calledWith(req.body.newEmail)).to.be.true;
    });

    it("should handle error validate user email", async () => {
      const { req, res, next } = createReqResNext();

      req.body = {
        newEmail: "user@example.com",
      };

      sinon
        .stub(userService, "validateEmail")
        .rejects(new Error("Erro ao validar email"));

      await userController.validateEmail(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(
        next.calledWithMatch(
          sinon.match
            .instanceOf(Error)
            .and(sinon.match.has("message", "Erro ao validar email"))
        )
      ).to.be.true;
    });
  });
});
